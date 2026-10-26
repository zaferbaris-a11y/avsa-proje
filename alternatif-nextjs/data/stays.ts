export type StayType = "otel" | "pansiyon" | "apart";

export interface Room {
  name: string;
  capacity: number;
  price: number; // gecelik, ₺
  note?: string;
}

export interface Stay {
  slug: string;
  name: string;
  type: StayType;
  area: string; // Yalı, Türkeli, Merkez...
  tagline: string;
  description: string;
  priceFrom: number; // gecelik başlangıç fiyatı, ₺
  amenities: string[];
  rooms: Room[];
  nearby: { label: string; distance: string }[];
  images: string[]; // /public altındaki yollar, örn. "/img/ornek-otel/1.jpg"
  whatsapp: string; // 90 ile başlayan, + olmadan
  phone?: string;
  checkIn: string;
  checkOut: string;
  gradient: string; // fotoğraf yokken kullanılan Tailwind gradyanı
}

export const typeLabels: Record<StayType, string> = {
  otel: "Otel",
  pansiyon: "Pansiyon",
  apart: "Apart",
};

export const stays: Stay[] = [
  {
    slug: "ornek-butik-otel",
    name: "Örnek Butik Otel",
    type: "otel",
    area: "Yalı",
    tagline: "Denize sıfır, sabah kahvaltısı teraste.",
    description:
      "Yalı sahiline birkaç adım mesafedeki butik otelimizde sabahı denizin sesiyle karşılarsın. Hafta sonu kaçamağı için sakin, temiz ve samimi bir ortam sunuyoruz.",
    priceFrom: 2800,
    amenities: ["Kahvaltı dahil", "Ücretsiz Wi-Fi", "Klima", "Otopark", "Deniz manzarası", "Çocuk dostu"],
    rooms: [
      { name: "Standart Oda", capacity: 2, price: 2800 },
      { name: "Deniz Manzaralı Oda", capacity: 2, price: 3400, note: "Balkonlu" },
      { name: "Aile Odası", capacity: 4, price: 4200 },
    ],
    nearby: [
      { label: "Yalı Plajı", distance: "50 m" },
      { label: "İskele", distance: "1,5 km" },
      { label: "Merkez çarşı", distance: "800 m" },
    ],
    images: [],
    whatsapp: "905000000000",
    phone: "+90 500 000 00 00",
    checkIn: "14:00",
    checkOut: "11:00",
    gradient: "from-sky-300 to-cyan-600",
  },
  {
    slug: "ornek-aile-pansiyonu",
    name: "Örnek Aile Pansiyonu",
    type: "pansiyon",
    area: "Merkez",
    tagline: "Ev yapımı kahvaltı, bahçede çay keyfi.",
    description:
      "Aile işletmesi olan pansiyonumuzda kendini evinde hissedeceksin. Bahçemizde ev yapımı reçellerle kahvaltı, akşamları sohbet.",
    priceFrom: 1400,
    amenities: ["Ev yapımı kahvaltı", "Bahçe", "Ücretsiz Wi-Fi", "Klima", "Ortak mutfak"],
    rooms: [
      { name: "İki Kişilik Oda", capacity: 2, price: 1400 },
      { name: "Üç Kişilik Oda", capacity: 3, price: 1900 },
    ],
    nearby: [
      { label: "Plaj", distance: "400 m" },
      { label: "Market", distance: "100 m" },
    ],
    images: [],
    whatsapp: "905000000000",
    checkIn: "14:00",
    checkOut: "11:00",
    gradient: "from-amber-200 to-orange-500",
  },
  {
    slug: "ornek-apart-evleri",
    name: "Örnek Apart Evleri",
    type: "apart",
    area: "Türkeli",
    tagline: "Mutfaklı, geniş, özgür bir tatil.",
    description:
      "Kendi mutfağın ve balkonunla ada tatilini istediğin gibi yaşa. Kalabalık aileler ve arkadaş grupları için ideal.",
    priceFrom: 2200,
    amenities: ["Tam donanımlı mutfak", "Balkon", "Klima", "Ücretsiz Wi-Fi", "Otopark"],
    rooms: [
      { name: "1+1 Apart", capacity: 3, price: 2200 },
      { name: "2+1 Apart", capacity: 5, price: 3600 },
    ],
    nearby: [
      { label: "Türkeli Plajı", distance: "300 m" },
      { label: "Restoranlar", distance: "500 m" },
    ],
    images: [],
    whatsapp: "905000000000",
    checkIn: "15:00",
    checkOut: "11:00",
    gradient: "from-rose-200 to-pink-500",
  },
];

export const getStay = (slug: string) => stays.find((s) => s.slug === slug);
export const formatPrice = (n: number) => `${n.toLocaleString("tr-TR")} ₺`;
