// Kiralık evler. Yeni ev eklemek için diziye bir kayıt ekle; /kiralik-evler sayfasında kart olarak görünür.
// Dizi boşken sayfada "ilanlar yakında" bölümü ve ev sahipleri için ilan verme çağrısı görünür.
export interface Ev {
  slug: string;
  name: string;
  area: string; // örn. "Yiğitler"
  bedrooms: number;
  guests: number;
  priceFrom: number; // gecelik TL, 0 = fiyat için arayın
  description: string;
  phone: string; // "+90 5xx xxx xx xx"
  whatsapp: string; // "905xxxxxxxxx"
  image?: string; // "/img/evler/ev-adi/1.webp"
}

export const evler: Ev[] = [];
