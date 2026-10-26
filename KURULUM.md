# Kurulum Rehberi (adım adım)

Bu rehber bilgisayarında hiç kod çalıştırmamış biri için yazıldı. Her adımı sırayla yap.

## 0) Hızlı bakış (kurulumsuz)
`onizleme.html` dosyasına çift tıkla. Tarayıcıda açılır. Üstten sayfa seçebilir, Masaüstü/Tablet/Telefon boyutuna geçebilirsin.
Sohbet botunun cevapları bu önizlemede örnektir. Gerçek bot için aşağıdaki kurulum gerekir.

## 1) Node.js kur
Astro 7 için **Node.js 22.22 veya üzeri** gerekir.
1. https://nodejs.org adresine git, **LTS** sürümünü indir ve kur (hep "İleri" de).
2. Terminali aç ve kontrol et:
   - Windows: Başlat menüsüne "PowerShell" yaz, aç.
   - Mac: Spotlight (Cmd+Boşluk) → "Terminal".
   ```bash
   node -v     # v22.22.0 veya daha yüksek görünmeli
   npm -v
   ```
   Daha düşük sürüm görürsen Node.js'i yeniden indirip kur.

## 2) Projeyi aç
1. `avsa-adasi-site-tam-proje.zip` dosyasını bir klasöre çıkar (örn. Masaüstü).
2. Terminalde o klasöre gir:
   ```bash
   cd Desktop/avsa-proje        # Windows'ta: cd $HOME\Desktop\avsa-proje
   ```
   İpucu: Klasörü VS Code ile açıp (code.visualstudio.com) içindeki terminali kullanabilirsin.

## 3) Paketleri kur
```bash
npm install
```
1-2 dakika sürer. `node_modules` klasörü oluşur, bu normal.

## 4) Sohbet botu için API anahtarı (isteğe bağlı)
Bot olmadan site tamamen çalışır, sadece sohbet balonu hata mesajı gösterir.
1. https://console.anthropic.com adresinde hesap aç ve **API Keys** bölümünden anahtar oluştur.
2. Anthropic panelinde **aylık harcama limiti** koy (ör. 10 $).
3. `.env.example` dosyasını kopyalayıp adını `.env` yap ve doldur:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
   `.env` dosyasını kimseyle paylaşma, GitHub'a yükleme (`.gitignore` bunu zaten engeller).

## 5) Siteyi çalıştır
```bash
npm run dev
```
Tarayıcıda **http://localhost:4321** aç. Dosyayı kaydettikçe sayfa kendiliğinden yenilenir. Durdurmak için terminalde `Ctrl+C`.
Telefonda bakmak için: `npm run dev -- --host` yaz, çıkan "Network" adresini (örn. http://192.168.1.20:4321) aynı Wi-Fi'daki telefonda aç.

## 6) Kendi bilgilerini gir (en önemli adım)
1. **`src/data/stays.ts`**: örnek sahte kayıtlar kaldırıldı; gerçek işletmelerini buraya ekle/düzenle. Her kayıt = bir sayfa. Yeni işletme için kaydı kopyalayıp yapıştır, `slug` değerini benzersiz yap (küçük harf, tire, Türkçe karakter yok).
2. **`src/data/site.ts`**: WhatsApp numarası (başında + olmadan, örn. `905xxxxxxxxx`).
3. **`astro.config.mjs`**: `site:` satırına kendi alan adını yaz.
4. İşletme bilgisi alanları: fiyat, oda, olanaklar, semt, adres, koordinat. Koordinatı Google Haritalar'da yere sağ tıklayıp alabilirsin.

## 7) Fotoğraf ekle (galeri)
1. Fotoğrafları küçült: genişlik ~1200 px, **WebP** formatı (squoosh.app ile ücretsiz). Her biri 200 KB altında olsun.
2. `public/img/isletme-adi/` klasörü oluştur, fotoğrafları `1.webp`, `2.webp`... diye koy.
3. `stays.ts` içinde ilgili işletmeye ekle:
   ```ts
   images: ["/img/isletme-adi/1.webp", "/img/isletme-adi/2.webp", "/img/isletme-adi/3.webp"],
   ```
4. İlk fotoğraf büyük görsel olur ve ana sayfa kartında da görünür. 5'ten fazla fotoğraf varsa "+N fotoğraf" etiketi çıkar.

## 8) Yayına alma
Önce derleyip dene:
```bash
npm run build
npm run preview
```

### Seçenek A: Vercel (en kolayı, ücretsiz plan yeter)
1. Projeyi GitHub'a yükle (github.com'da yeni depo aç, "Upload files" ile dosyaları sürükle; `node_modules` ve `.env` yüklenmesin).
2. Terminalde Vercel eklentisini kur (Node eklentisinin yerine geçer):
   ```bash
   npx astro add vercel
   ```
3. https://vercel.com → **Add New Project** → GitHub deponu seç → **Deploy**.
4. Vercel'de **Settings → Environment Variables** bölümüne `ANTHROPIC_API_KEY` ekle ve yeniden yayınla (Redeploy).
5. **Settings → Domains** bölümünden alan adını bağla; Vercel'in gösterdiği DNS kayıtlarını alan adı sağlayıcında gir.

### Seçenek B: Netlify
Proje Netlify için hazır (`@astrojs/netlify` adaptörü ve `netlify.toml` ekli). GitHub'dan içe aktar; Site configuration > Environment variables bölümüne `ANTHROPIC_API_KEY` ekle (sohbet botu için). Build komutu `npm run build`.

### Seçenek C: Kendi sunucun (VPS)
Mevcut ayar (Node adapter) bunun içindir:
```bash
npm run build
node ./dist/server/entry.mjs
```
Ortam değişkenini sunucuda tanımla (`ANTHROPIC_API_KEY`), önüne Nginx/Caddy koyup HTTPS ekle, süreci `pm2` ile ayakta tut.

## 9) Yayından sonra
- Google Search Console'a (search.google.com/search-console) siteyi ekle, `https://alanadin.com/sitemap.xml` adresini gönder.
- Rich Results Test (search.google.com/test/rich-results) ile bir işletme sayfasını dene.
- Lighthouse: Chrome'da siteyi aç, F12 → Lighthouse → Mobile → Analyze.

## Sık karşılaşılan sorunlar
| Sorun | Çözüm |
|---|---|
| `npm: command not found` | Node.js kurulu değil ya da terminal kurulumdan önce açılmış; terminali kapat-aç |
| `Unsupported engine` / Node sürüm hatası | Node'u 22.22+ sürümüne güncelle |
| `Cannot find module ...` | Proje klasöründe `npm install` çalıştır |
| Stil/renkler görünmüyor | `npm install` yap, `npm run dev`'i yeniden başlat |
| Port 4321 dolu | Astro otomatik başka port seçer, terminaldeki adresi aç |
| Sohbet "Sohbet şu an kullanılamıyor" diyor | `.env` içinde `ANTHROPIC_API_KEY` yok ya da dev sunucusu yeniden başlatılmadı |
| Sohbet "Şu an cevap veremiyorum" diyor | Anahtar hatalı ya da API bakiyesi/limit doldu; Anthropic panelini kontrol et |
| Yayında sohbet çalışmıyor | Barındırma panelinde ortam değişkeni eklenip yeniden yayınlanmalı |
| Fotoğraf görünmüyor | Yol `/img/...` ile başlamalı ve dosya `public/img/...` altında olmalı; büyük/küçük harf eşleşmeli |
