// Kiralık evler. Yeni ev eklemek için diziye bir kayıt ekle; /kiralik-evler sayfasında kart olarak görünür.
// Telefon ve WhatsApp ev sahibine aittir. Boş bırakılırsa kartta iletişim düğmesi görünmez; ev sahibinin yazılı onayı olmadan numara yayınlama.
// Fotoğraf: /public/img/evler/<slug>/1.webp (kendi çektiğin, logosuz, plakasız). Yoksa kartta simge görünür.
export interface Ev {
  slug: string;
  name: string; // kart başlığı
  area: string; // örn. "Yiğitler Köyü"
  type: string; // "Yıllık kiralık" | "Dönemlik kiralık"
  rooms: string; // örn. "2+1"
  monthlyRent: number; // aylık kira, TL
  deposit: string; // örn. "1 aylık kira"
  contract: string; // sözleşme süresi / müsaitlik
  furnished: boolean;
  features: string[]; // ilan metninden doğrulanmış özellikler
  description: string;
  phone: string; // "+90 5xx xxx xx xx" (boş olabilir)
  whatsapp: string; // "905xxxxxxxxx" (boş olabilir)
  image?: string; // ana fotoğraf: "/img/evler/ev-adi/1.webp"
  gallery?: string[]; // ek fotoğraflar (ana fotoğraf hariç)
  imageNote?: string; // dolu ise fotoğraf üzerinde etiket çıkar (örn. "Temsili görsel")
}

export const EVLER_GUNCELLEME = "2 Kasım 2026";

export const evler: Ev[] = [
  {
    slug: "yigitler-bahceli-2-1",
    name: "Yiğitler Köyü'nde bahçeli, eşyalı 2+1 daire",
    area: "Yiğitler Köyü",
    type: "Dönemlik kiralık",
    rooms: "2+1",
    monthlyRent: 26000,
    deposit: "1 aylık kira",
    contract: "Haziran ayına kadar kiralık",
    furnished: true,
    features: ["Giriş kat", "Bahçeli", "Verandalı", "Bahçede mangal", "Eşyalı", "2 oda + 1 salon", "Televizyon"],
    description:
      "Yiğitler Köyü'nün sakin ortamında, giriş katta, bahçeli ve eşyalı olarak teslim edilen daire. Önünde veranda, bahçede mangal ve açık hava lavabosu var. Haziran ayına kadar kiralıktır.",
    phone: "",
    whatsapp: "",
    image: "/img/evler/yigitler-bahceli-2-1/1.webp",
    gallery: [
      "/img/evler/yigitler-bahceli-2-1/2.webp",
      "/img/evler/yigitler-bahceli-2-1/3.webp",
      "/img/evler/yigitler-bahceli-2-1/4.webp",
      "/img/evler/yigitler-bahceli-2-1/5.webp",
      "/img/evler/yigitler-bahceli-2-1/6.webp",
    ],
  },
  {
    slug: "merkez-ters-dubleks-3-1",
    name: "Merkezde, üzüm heykeline yakın ters dubleks ev",
    area: "Avşa merkez",
    type: "Yıllık kiralık",
    rooms: "3+1",
    monthlyRent: 20000,
    deposit: "1 aylık kira",
    contract: "Yıllık kiralama (12 ay)",
    furnished: true,
    features: ["Ters dubleks", "Teras katı", "3 yatak odası", "Salon ve açık mutfak", "Eşyalı"],
    description:
      "Avşa merkezde, üzüm heykeline yakın konumda; teras katı olan, 3 yatak odalı, salon ve açık mutfaklı geniş ev.",
    phone: "",
    whatsapp: "",
    image: "/img/merkez-konaklama/avsa-merkez-sahil-yolu-manzara-1.webp",
    imageNote: "Temsili görsel: Avşa merkez. Evin fotoğrafı değildir.",
  },
  {
    slug: "merkez-verandali-bahceli-1-1",
    name: "Merkezde verandalı ve bahçeli 1+1 daire",
    area: "Avşa merkez, Yiğitler Yolu üzeri",
    type: "Yıllık kiralık",
    rooms: "1+1",
    monthlyRent: 18000,
    deposit: "1 aylık kira",
    contract: "Yıllık kiralama (12 ay)",
    furnished: true,
    features: ["Denize yaklaşık 400 metre", "Önünde veranda", "Bahçe ve ekstra hobi bahçesi", "Eşyalı", "Çamaşır makinesi", "Buzdolabı", "Televizyon", "Köşe koltuk"],
    description:
      "Yiğitler Yolu üzerinde, merkezde; önünde veranda, bahçe ve ayrıca hobi bahçesi olan 1+1 daire. Denize yaklaşık 400 metre. Mutfakta buzdolabı, çamaşır makinesi ve ocak var, salonda televizyon bulunuyor.",
    phone: "",
    whatsapp: "",
    image: "/img/evler/merkez-verandali-bahceli-1-1/1.webp",
    gallery: [
      "/img/evler/merkez-verandali-bahceli-1-1/2.webp",
      "/img/evler/merkez-verandali-bahceli-1-1/3.webp",
      "/img/evler/merkez-verandali-bahceli-1-1/4.webp",
      "/img/evler/merkez-verandali-bahceli-1-1/5.webp",
    ],
  },
  {
    slug: "merkez-denize-yakin-1-1",
    name: "Merkezde denize yakın, eşyalı 1+1 daire",
    area: "Avşa merkez",
    type: "Yıllık kiralık",
    rooms: "1+1",
    monthlyRent: 20000,
    deposit: "1 aylık kira",
    contract: "Yıllık kiralama (12 ay)",
    furnished: true,
    features: ["2. kat", "Denize yakın", "İskeleye yürüyüş mesafesinde", "Eşyalı", "Çamaşır makinesi", "Buzdolabı", "Televizyon", "Duşakabinli banyo"],
    description:
      "Avşa merkezde, denize yakın ve iskeleye yürüyerek ulaşılabilen, 2. katta eşyalı 1+1 daire. Mutfakta buzdolabı, çamaşır makinesi ve televizyon var; yatak odası eşyalı.",
    phone: "",
    whatsapp: "",
    image: "/img/evler/merkez-denize-yakin-1-1/1.webp",
    gallery: [
      "/img/evler/merkez-denize-yakin-1-1/2.webp",
      "/img/evler/merkez-denize-yakin-1-1/3.webp",
      "/img/evler/merkez-denize-yakin-1-1/4.webp",
    ],
  },
];
