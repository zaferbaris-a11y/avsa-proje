// Avşa'da önerdiğin restoran ve kafeler. Liste BOŞ olduğu sürece /avsada-ne-yenir/ sayfasında
// "Önerilen restoranlar" bölümü hiç görünmez ve restoran şeması (JSON-LD) eklenmez.
// Yalnızca bizzat bildiğin / doğruladığın mekânları ekle; fiyat yazma (sezona göre değişir).
export interface Restoran {
  name: string;
  area: string; // "Merkez sahil", "Yiğitler", "Çarşı içi"...
  kind: string; // "Balık restoranı", "Esnaf lokantası", "Meyhane"...
  note: string; // 1-2 cümle, neden önerildiği
  servesCuisine?: string[]; // ["Deniz ürünleri", "Meze"]
  phone?: string; // +90...
  schemaType?: "Restaurant" | "Bakery"; // varsayılan Restaurant
}

export const restoranlar: Restoran[] = [
  // Örnek (silip kendi listeni ekle):
  // { name: "Örnek Balık Restoranı", area: "Merkez sahil", kind: "Balık restoranı", note: "İskele manzaralı, günlük balık.", servesCuisine: ["Deniz ürünleri"] },
  // Avşa'lı Zafer Barış'ın kişisel önerileri (3 Kasım 2026). Fiyat ve çalışma saati yazılmadı.
  { name: "Lakerda", area: "İskele yakını", kind: "Balık restoranı", note: "Balık için güvenilir bulduğum mekân. İskele yakınında.", servesCuisine: ["Deniz ürünleri"] },
  { name: "Şahin Tepesi Restoran", area: "Altınkum plajı", kind: "Plaj restoranı", note: "Altınkum plajında midye tavasını burada denemenizi öneririm.", servesCuisine: ["Deniz ürünleri", "Midye tava"] },
  { name: "İsmet'in Yeri", area: "Çınar Koyu", kind: "Mangal restoranı", note: "Çınar Koyu'nda et ve mangal ürünleri için tercihim.", servesCuisine: ["Et", "Mangal"] },
  { name: "Tamburger", area: "Barlar Caddesi", kind: "Kahvaltı mekânı", note: "Barlar Caddesi'nde, açık büfe kahvaltısıyla öneririm.", servesCuisine: ["Kahvaltı"] },
  { name: "Özlem Pastanesi", area: "İskele meydanı", kind: "Pastane", note: "İskele meydanında; börek ve poğaça çeşitleri için.", servesCuisine: ["Börek", "Poğaça"], schemaType: "Bakery" },
];
