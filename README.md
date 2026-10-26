# Avşa Rehber — Avşa Adası otel, pansiyon ve apart tanıtım sitesi

Astro 7 + Tailwind CSS 4 ile hazırlanmış statik ağırlıklı site. Tek SSR parçası `/api/chat` (sohbet botu).
Hedef kitle: İstanbul, Bursa ve Tekirdağ'dan hafta sonu kaçamağı arayan 25-45 yaş çift ve aileler. Dil: samimi, davetkar.

## Hızlı başlangıç

> Gereksinim: **Node.js 22.22 veya üzeri** (Astro 7). Ayrıntılı adım adım kurulum için `KURULUM.md` dosyasına bak. Tarayıcıda hızlı bakış için `onizleme.html` dosyasını çift tıklayıp aç (kurulum gerekmez).

```bash
npm install
cp .env.example .env     # ANTHROPIC_API_KEY değerini doldur (bot için)
npm run dev              # http://localhost:4321
```

Telefonda önizleme: `npm run dev -- --host` (aynı Wi-Fi'da çıkan Network adresini aç).
Derleme: `npm run build`, çalıştırma: `node ./dist/server/entry.mjs` (node adapter).

## Klasör yapısı

```
src/
  data/stays.ts        ← TÜM İŞLETME VERİSİ (tek kaynak). Yeni işletme = diziye yeni kayıt
  data/site.ts         ← WhatsApp numarası (tek yerde)
  layouts/Layout.astro ← ortak <head> (title, canonical, og, font, favicon) + sohbet balonu
  components/ChatWidget.astro ← sağ alttaki sohbet botu arayüzü
  components/Gallery.astro    ← fotoğraf galerisi + tam ekran büyütme (lightbox)
  lib/chatPrompt.ts    ← botun talimatları; işletme listesini stays.ts'ten otomatik alır
  pages/
    index.astro                          ← ana sayfa
    konaklama/[slug].astro               ← her işletme için dinamik detay sayfası (+ JSON-LD)
    avsa-adasi-tarihi-ve-plajlari.astro  ← SEO blog yazısı (~800 kelime)
    api/chat.ts                          ← Claude API'ye giden sunucu endpoint'i
    sitemap.xml.ts, robots.txt.ts        ← dinamik sitemap ve robots
  styles/global.css    ← Tailwind teması (renkler: deniz, kum, gunbatimi)
public/
  favicon.svg, _headers (Netlify/Cloudflare önbellek)
  img/<işletme>/N.svg  ← ÖRNEK görseller (yer tutucu). Gerçek fotoğraflarla değiştir
onizleme.html          ← tek dosyalık statik önizleme (kurulumsuz bakış)
alternatif-nextjs/     ← Next.js sürümünün detay sayfası şablonu (eski, referans; ana proje Astro)
```

## Yeni işletme eklemek

`src/data/stays.ts` içindeki `stays` dizisine bir kayıt ekle. Sayfa, sitemap, ana sayfa kartı ve sohbet botu otomatik güncellenir.
Zorunlu alanlar: `slug` (küçük harf, tire), `name`, `type` (otel | pansiyon | apart), `area`, `tag`, `tagline`, `description`,
`priceFrom`, `amenities`, `rooms`, `nearby`, `images`, `whatsapp`, `checkIn`, `checkOut`, `gradient`.
İsteğe bağlı: `seoTitle` (~60 kar.), `seoDescription` (~155 kar.), `streetAddress`, `postalCode`, `geo`, `starRating`, `schemaType`, `phone`.
Fotoğraflar: `public/img/<işletme>/1.webp` → `images: ["/img/<işletme>/1.webp", ...]` (WebP, ~1200 px genişlik).
Galeri fotoğraf sayısına göre düzen seçer: 0 = gradyan yer tutucu, 1-4 = büyük görsel + alt sıra, 5+ = mozaik ("+N fotoğraf" etiketiyle). Tıklayınca tam ekran açılır; ok tuşları, kaydırma ve Esc çalışır.
Gerçek fotoğrafları `public/img/<slug>/1.webp` gibi koyup `images` listesine yaz; liste boşsa gradyan gösterilir.
Sosyal medya paylaşımlarında (og:image) SVG görünmez; kapak için JPG/WebP kullan.

> Dikkat: `seoDescription` içindeki fiyat metin olarak yazılı; fiyatı değiştirirsen orayı da elle güncelle.

## Yapılması gerekenler (yayın öncesi)

- [ ] `stays.ts` içindeki işletmelere adres, koordinat, fotoğraf ekle
- [ ] WhatsApp numarasını `src/data/site.ts` içinde güncelle
- [ ] `astro.config.mjs` → `site:` alan adını yaz
- [ ] `.env` → `ANTHROPIC_API_KEY` (barındırma panelinde de ortam değişkeni olarak ekle); Anthropic panelinde aylık harcama limiti koy
- [ ] Blog yazısındaki mesafe ve manastır bilgisini yerel olarak doğrula (kaynaklar birbirini tutmuyordu)
- [ ] Ana sayfadaki istatistikleri ("100+", "3+") ve ulaşım adımlarını gerçek bilgiyle kontrol et
- [ ] Yayından sonra Search Console'a `/sitemap.xml` gönder, Rich Results Test ile JSON-LD'yi kontrol et
- [ ] Lighthouse'u mobil modda ölç (build + preview üzerinde)

## Sohbet botu

- Model: `claude-haiku-5-5` (varsayılan), `.env` → `ANTHROPIC_MODEL` ile değişir.
- Kurallar: sadece listedeki bilgiye dayanır, fiyat/müsaitlik uydurmaz, rezervasyon için işletmenin WhatsApp linkini verir, konu dışına çıkmaz.
- Hız sınırı: IP başına 10 dakikada 20 mesaj (bellek içi; sunucusuzda barındırma tarafında da sınır koy).
- Anahtar yoksa balon açılır ama mesaj hata + WhatsApp linki gösterir.

## SEO metinleri (özet)

| Sayfa | Title | 
|---|---|
| Ana sayfa | Avşa Adası Otel, Pansiyon ve Apart Rehberi \| Avşa Rehber |
| Blog | Avşa Adası Tarihi ve Plajları \| Marmara'nın Huzurlu Köşesi |
| İşletmeler | `stays.ts` içindeki `seoTitle` / `seoDescription` alanları |

Canonical, sitemap ve JSON-LD adresleri sonunda `/` ile biter (örn. `/konaklama/ados-otel/`); hepsi birbiriyle uyumlu.

## Lighthouse için yapılanlar

Koyulaştırılmış turuncu (`#c2410c`, AA kontrast), bloklamayan font yükleme, favicon, `aria-pressed`/`aria-label`, büyütülmüş dokunma hedefleri,
görsel boyut nitelikleri, `fetchpriority`, `inlineStylesheets: "always"`, önbellek başlıkları (`public/_headers`).
Opsiyonel sonraki adım: fontları `@fontsource-variable/inter` ve `@fontsource-variable/fraunces` ile kendi sunucuna al.

## Olası sonraki işler

- Her işletme için galeri/lightbox ve harita bölümü
- Sohbet cevaplarını akarak gösterme (streaming)
- Ana sayfa kartlarına tür/semt filtresi ve arama
- Yeni blog yazıları (`sitemap.xml.ts` içindeki `staticPages` listesine eklemeyi unutma)
