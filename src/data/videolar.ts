// Kanaldaki videolar: sayfalara tek yerden yerleştirilir (başlıklar YouTube'daki başlıklarla aynı olmalı).
export const videolar = {
  pansiyon: { id: "i_k6-5nKTXM", baslik: "Avşa Adası Pansiyon Fiyatları 2027" },
  kalinir: { id: "B72QU8ZPJJ8", baslik: "Avşa'da Nerede Kalınır? Merkez mi, Yiğitler mi, Değirmenardı mı? (2027 Rehberi)" },
  nasilgidilir: { id: "rlvWTTpPAtE", baslik: "Avşa Adası'na Nasıl Gidilir? 2027 Güncel Feribot ve Bilet Rehberi" },
  feribot: { id: "HxBD9bfOJhM", baslik: "Erdek Avşa Adası Feribot Seferleri 2027 – Güncel Rehber" },
  gezi: { id: "zy02TMMLbRk", baslik: "Avşa Adasında Gezilecek Yerler: Ada Turu Rehberi 2027" },
  altinkum: { id: "JedU-_KVo4g", baslik: "Avşa Adası Altınkum Plajı Nerede? Denizi Nasıl?" },
  beyazsaray: { id: "nX6xC11PW18", baslik: "Avşa Adası Beyaz Saray Koyu Nerede? Denizi Nasıl?" },
  karadut: { id: "GXrWCtWU25g", baslik: "Avşa Adası Karadut Plajı Nerede? Denizi Nasıl?" },
  gestasroro: { id: "8jsnfGfnghk", baslik: "Erdek Avşa Feribot Saatleri 2027: GESTAŞ ve Marmara RoRo" },
  arabayla: { id: "hKdr_-ZJiCA", baslik: "Arabayla Avşa'ya Gidilir mi? Araçlı Feribot Rehberi" },
  iptal: { id: "CDDHgK9w-LY", baslik: "Avşa Feribot Seferleri İptal Olursa Ne Yapılır? 2027" },
  roro: { id: "3cvReUxQWV8", baslik: "Marmara RoRo ile Avşa'ya Gitmek: Kış Tarifesi (2027)" },
  cinar: { id: "LtrM7GGst70", baslik: "Avşa Adası Çınar Koyu Havadan: Drone Çekim" },
  altinkumdrone: { id: "fLaMl1CU04E", baslik: "Avşa Adası Altınkum Plajı Havadan: Drone Çekim" },
  kis: { id: "3TVf9kUNlVI", baslik: "Kışın Avşa’ya Nasıl Gidilir? Erdek, GESTAŞ ve Marmara RoRo (2027)" },
  merkezplaj: { id: "HtkRX1y3n38", baslik: "Avşa Adası Merkez Plajları: Nerede? Denizi Nasıl? (2027 Rehberi)" },
  tavsanli: { id: "FKv4-q0_RsQ", baslik: "Avşa Adası Tavşanlı Koyu Havadan: Drone Çekim" },
  drone: { id: "nvFeoPcknyY", baslik: "Avşa Adası Havadan: Tüm Plajlar ve Koylar (Drone Çekimi)" },
} as const;
export type VideoKey = keyof typeof videolar;
