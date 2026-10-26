import type { APIRoute } from "astro";
import { buildSystemPrompt } from "../../lib/chatPrompt";

// Bu endpoint sunucuda çalışır (SSR). Statik sitede bile bu dosya için bir adapter gerekir: `npx astro add node`
export const prerender = false;

// Ortam değişkeni: önce Astro, yoksa çalışma zamanındaki process.env (Vercel, Netlify, Node sunucu)
const env = (key: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[key] ?? (globalThis as any).process?.env?.[key];

const MODEL = env("ANTHROPIC_MODEL") || "claude-haiku-5-5";
const SYSTEM = buildSystemPrompt();

const MAX_HISTORY = 10; // modele gönderilen son mesaj sayısı
const MAX_CHARS = 500; // tek mesajın azami uzunluğu

// Basit hız sınırı (bellek içi). Sunucusuz ortamlarda sıfırlanabilir; barındırma tarafında da sınır koy.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 20;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > LIMIT;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });

type Msg = { role: "user" | "assistant"; content: string };

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = env("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "Sohbet şu an kullanılamıyor." }, 500);

  if (rateLimited(clientAddress ?? "anon")) {
    return json({ error: "Çok fazla mesaj gönderdin, biraz sonra tekrar dene." }, 429);
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  if (!Array.isArray(body.messages)) return json({ error: "Geçersiz istek." }, 400);

  // Gelen mesajları temizle: sadece user/assistant, metin, uzunluk sınırı, son N mesaj
  let messages: Msg[] = body.messages
    .filter(
      (m: any): m is Msg =>
        m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim() !== ""
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    .slice(-MAX_HISTORY);

  // API ilk mesajın "user" olmasını ister
  while (messages.length > 0 && messages[0].role !== "user") messages.shift();
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return json({ error: "Mesaj bulunamadı." }, 400);
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 600, system: SYSTEM, messages }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      console.error("Anthropic API hatası:", res.status, await res.text());
      return json({ error: "Şu an cevap veremiyorum, biraz sonra tekrar dene." }, 502);
    }

    const data = await res.json();
    const reply = (data.content ?? [])
      .filter((b: any) => b.type === "text")
      .map((b: any) => b.text)
      .join("\n")
      .trim();

    return json({ reply: reply || "Bunu tam anlayamadım, biraz daha açar mısın?" });
  } catch (err) {
    console.error("Chat hatası:", err);
    return json({ error: "Şu an cevap veremiyorum, biraz sonra tekrar dene." }, 502);
  }
};
