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
}

export const restoranlar: Restoran[] = [
  // Örnek (silip kendi listeni ekle):
  // { name: "Örnek Balık Restoranı", area: "Merkez sahil", kind: "Balık restoranı", note: "İskele manzaralı, günlük balık.", servesCuisine: ["Deniz ürünleri"] },
];
