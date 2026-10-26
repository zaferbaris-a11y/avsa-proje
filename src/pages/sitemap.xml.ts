import type { APIRoute } from "astro";
import { stays } from "../data/stays";

// Sitemap'e girecek sabit sayfalar. Yeni sayfa eklediğinde buraya da ekle.
const staticPages = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/kiralik-evler/", changefreq: "weekly", priority: 0.8 },
  { path: "/iletisim/", changefreq: "yearly", priority: 0.5 },
  { path: "/avsa-adasi-tarihi-ve-plajlari/", changefreq: "monthly", priority: 0.8 },
  { path: "/avsa-otelleri/", changefreq: "weekly", priority: 0.8 },
  { path: "/avsa-pansiyonlari/", changefreq: "weekly", priority: 0.8 },
  { path: "/avsa-apartlari/", changefreq: "weekly", priority: 0.8 },
  { path: "/avsa-adasi/", changefreq: "weekly", priority: 0.9 },
  { path: "/avsa-adasina-nasil-gidilir/", changefreq: "monthly", priority: 0.9 },
  { path: "/istanbuldan-avsaya/", changefreq: "monthly", priority: 0.9 },
  { path: "/avsa-adasi-gezi-rotasi/", changefreq: "monthly", priority: 0.8 },
  { path: "/avsa-adasina-ne-zaman-gidilir/", changefreq: "monthly", priority: 0.8 },
  { path: "/avsa-sarabi-saraphaneler/", changefreq: "monthly", priority: 0.7 },
  { path: "/altinkum-plaji/", changefreq: "monthly", priority: 0.7 },
  { path: "/cinar-koyu/", changefreq: "monthly", priority: 0.7 },
  { path: "/yigitler-konaklama/", changefreq: "monthly", priority: 0.8 },
  { path: "/avsa-merkez-konaklama/", changefreq: "monthly", priority: 0.8 },
  { path: "/kadinlar-plaji/", changefreq: "monthly", priority: 0.7 },
  { path: "/avsada-ne-yenir/", changefreq: "monthly", priority: 0.7 },
  { path: "/plajlar/", changefreq: "monthly", priority: 0.7 },
  { path: "/gezilecek-yerler/", changefreq: "monthly", priority: 0.7 },
  { path: "/barlar-sokagi/", changefreq: "monthly", priority: 0.7 },
  { path: "/gece-hayati/", changefreq: "monthly", priority: 0.7 },
  { path: "/feribot-saatleri/", changefreq: "monthly", priority: 0.7 },
  { path: "/bilet-fiyatlari/", changefreq: "monthly", priority: 0.7 },
];

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const GET: APIRoute = ({ site }) => {
  // astro.config.mjs içindeki `site` ayarı kullanılır
  const base = site ?? new URL("https://www.avsaadasi.net");
  const lastmod = new Date().toISOString().split("T")[0]; // build tarihi

  // İşletme sayfaları stays.ts dosyasından otomatik gelir
  const stayPages = stays.map((s) => ({
    path: `/konaklama/${s.slug}/`,
    changefreq: "weekly",
    priority: 0.9,
  }));

  const urls = [...staticPages, ...stayPages]
    .map(
      (p) => `  <url>
    <loc>${escapeXml(new URL(p.path, base).href)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
