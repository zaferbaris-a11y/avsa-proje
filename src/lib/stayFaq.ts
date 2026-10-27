// Tesis sayfaları için tesise özgü soru-cevaplar. Yalnızca stays.ts'teki verilerden üretilir;
// veri yoksa o soru hiç eklenmez (uydurma bilgi yok).
import { hasPrice, formatPrice, type Stay } from "../data/stays";

export interface Qa { q: string; a: string }

const tl = (n: number) => formatPrice(n);

export function buildStayFaq(stay: Stay): Qa[] {
  const out: Qa[] = [];
  const hasArea = stay.area !== "Avşa Adası";
  const where = hasArea ? `Avşa Adası'nın ${stay.area} bölgesinde` : "Avşa Adası'nda";
  const nearbyTxt = (re: RegExp) =>
    stay.nearby.filter((n) => re.test(n.label)).map((n) => `${n.label} (${n.distance})`).join(", ");

  // 1) Konum
  const addr = stay.streetAddress ? ` Adres: ${stay.streetAddress}, ${stay.addressText ?? "Avşa Adası, Marmara / Balıkesir"}.` : "";
  out.push({ q: `${stay.name} nerede?`, a: `${stay.name}, ${where} yer alan bir ${(stay.kind ?? stay.type).toLowerCase()} tesisidir.${addr}` });

  // 2) Denize / iskeleye mesafe
  const sea = nearbyTxt(/deniz|plaj|sahil|kumsal/i);
  const pier = nearbyTxt(/iskele/i);
  const seaAmenity = stay.amenities.find((a) => /denize/i.test(a));
  if (sea || seaAmenity) {
    out.push({
      q: `${stay.name} denize ne kadar yakın?`,
      a: `${sea ? `Tesis sayfasındaki bilgiye göre: ${sea}.` : `Olanaklar arasında "${seaAmenity}" yer alıyor.`} Kesin mesafe ve yürüyüş yolu için işletmeyle teyit edebilirsiniz.`,
    });
  }
  if (pier) {
    out.push({ q: `${stay.name} feribot iskelesine uzak mı?`, a: `Tesis sayfasındaki bilgiye göre: ${pier}. Bagajla ulaşım için işletmeye danışabilirsiniz.` });
  }

  // 3) Fiyat
  const prices = stay.rooms.map((r) => r.price).filter(hasPrice);
  if (hasPrice(stay.priceFrom) || prices.length) {
    const lo = prices.length ? Math.min(...prices) : stay.priceFrom;
    const hi = prices.length ? Math.max(...prices) : stay.priceFrom;
    const range = lo === hi ? `${tl(lo)}` : `${tl(lo)} ile ${tl(hi)} arasında`;
    out.push({
      q: `${stay.name} gecelik fiyatları ne kadar?`,
      a: `Sitemizde yer alan başlangıç fiyatlarına göre gecelik ${range}. Fiyatlar sezona, tarihe, oda tipine ve kişi sayısına göre değişir; güncel fiyat için işletmeye WhatsApp'tan yazabilirsiniz.`,
    });
  }

  // 4) Oda ve kapasite
  if (stay.rooms.length) {
    const caps = stay.rooms.map((r) => r.capacity).filter((n) => n > 0);
    const names = stay.rooms.slice(0, 4).map((r) => `${r.name} (${r.capacity} kişilik)`).join(", ");
    out.push({
      q: `${stay.name}'de ${stay.type === "apart" ? "hangi daire" : "hangi oda"} seçenekleri var?`,
      a: `${names}${stay.rooms.length > 4 ? " ve diğerleri" : ""}.${caps.length ? ` Kapasite ${Math.min(...caps)} ile ${Math.max(...caps)} kişi arasında değişiyor.` : ""}`,
    });
  }

  // 5) Olanaklar
  if (stay.amenities.length) {
    out.push({ q: `${stay.name}'de hangi olanaklar var?`, a: `Sayfada listelenen olanaklar: ${stay.amenities.slice(0, 10).join(", ")}. Mevsime göre değişen hizmetleri rezervasyondan önce teyit etmenizi öneririz.` });
  }

  // 6) Havuz / kahvaltı / evcil hayvan: yalnızca veride geçiyorsa
  const pool = stay.amenities.find((a) => /havuz|aquapark/i.test(a));
  if (pool) out.push({ q: `${stay.name}'de havuz var mı?`, a: `Evet, olanaklar arasında "${pool}" yer alıyor. Açılış-kapanış tarihleri ve kullanım koşulları için işletmeye sorabilirsiniz.` });
  const bf = stay.amenities.find((a) => /kahvalt/i.test(a));
  if (bf) out.push({ q: `${stay.name}'de kahvaltı var mı?`, a: /dahil/i.test(bf) ? `Tesis sayfasında "${bf}" olarak belirtilmiş. Kapsamı ve geçerli dönemleri rezervasyon sırasında teyit edin.` : `Olanaklar arasında "${bf}" yer alıyor. Fiyata dahil olup olmadığını rezervasyon sırasında teyit edin.` });
  const pet = stay.amenities.find((a) => /evcil/i.test(a));
  if (pet) out.push({ q: `${stay.name}'de evcil hayvan kabul ediliyor mu?`, a: `Olanaklar arasında "${pet}" yer alıyor. Koşullar için işletmeyle görüşün.` });

  // 7) Giriş / çıkış (yalnızca gerçek saat varsa)
  if (/\d{1,2}[:.]\d{2}/.test(stay.checkIn) && /\d{1,2}[:.]\d{2}/.test(stay.checkOut)) {
    out.push({ q: `${stay.name} giriş ve çıkış saatleri nedir?`, a: `Giriş ${stay.checkIn}, çıkış ${stay.checkOut}. Feribot saatine göre erken giriş ya da geç çıkış için işletmeyle önceden konuşabilirsiniz.` });
  }

  // 8) Rezervasyon
  out.push({
    q: `${stay.name}'de rezervasyon nasıl yapılır?`,
    a: `Sayfadaki WhatsApp düğmesinden ${stay.phone ? `ya da ${stay.phone} numaralı telefondan ` : ""}tarih ve kişi sayısını yazarak işletmeyle doğrudan görüşebilirsiniz. Fiyat ve müsaitlik bilgisini işletme verir.`,
  });

  return out.slice(0, 8);
}
