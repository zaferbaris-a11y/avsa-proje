// Kanaldaki videolar: sayfalara tek yerden yerleştirilir (başlıklar YouTube'daki başlıklarla aynı olmalı).
export const videolar = {
  pansiyon: { id: "i_k6-5nKTXM", baslik: "Avşa Adası Pansiyon Fiyatları 2027" },
  kalinir: { id: "B72QU8ZPJJ8", baslik: "Avşa'da Nerede Kalınır? Merkez mi, Yiğitler mi, Değirmenardı mı? (2027 Rehberi)" },
  nasilgidilir: { id: "rlvWTTpPAtE", baslik: "Avşa Adası'na Nasıl Gidilir? 2027 Güncel Feribot ve Bilet Rehberi" },
  feribot: { id: "HxBD9bfOJhM", baslik: "Erdek Avşa Adası Feribot Seferleri 2027 – Güncel Rehber" },
  gezi: { id: "zy02TMMLbRk", baslik: "Avşa Adasında Gezilecek Yerler: Ada Turu Rehberi 2027" },
} as const;
export type VideoKey = keyof typeof videolar;
