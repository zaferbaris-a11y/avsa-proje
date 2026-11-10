// Bilgi sayfalarının ortak listesi: ana sayfadaki çip satırı, alt bilgi ve "diğer rehberler" bölümü buradan beslenir.
export interface RehberPage {
  path: string; // /plajlar
  label: string; // çip başlığı
  icon: string;
  short: string; // kart açıklaması
  chip?: boolean; // false ise ana sayfadaki çip satırında gösterilmez (varsayılan: gösterilir)
}

export const rehberPages: RehberPage[] = [
  { path: "/avsa-adasi/", label: "Avşa Nerede?", icon: "📍", short: "Avşa Adası nerede, nasıl bir yer? Adaya genel rehber" },
  { path: "/avsa-adasina-nasil-gidilir/", label: "Avşa'ya Nasıl Gidilir?", icon: "🚗", short: "İstanbul, Bursa, Tekirdağ ve Erdek'ten ulaşım" },
  { path: "/istanbuldan-avsaya/", label: "İstanbul'dan Avşa'ya", icon: "🚤", short: "İDO, Erdek ve Tekirdağ rotaları, süreler ve bilet ipuçları", chip: false },
  { path: "/avsa-adasi-gezi-rotasi/", label: "Gezi Rotası", icon: "🗺️", short: "1, 2 ve 3 günlük Avşa gezi planları", chip: false },
  { path: "/altinkum-plaji/", label: "Altınkum Plajı", icon: "🏝️", short: "Altınkum: kum, deniz, plaj işletmeleri ve ulaşım", chip: false },
  { path: "/cinar-koyu/", label: "Çınar Koyu", icon: "🌲", short: "Çınar Koyu: adanın en geniş plajı, işletmeler ve ulaşım", chip: false },
  { path: "/kadinlar-plaji/", label: "Kadınlar Plajı", icon: "🌊", short: "Kadınlar Plajı: kimler girebilir, ulaşım ve ipuçları", chip: false },
  { path: "/yigitler-konaklama/", label: "Yiğitler Konaklama", icon: "🏡", short: "Yiğitler Köyü otel ve apartları, plajlara uzaklık", chip: false },
  { path: "/avsa-merkez-konaklama/", label: "Merkez Konaklama", icon: "🏨", short: "İskele ve Barlar Sokağı yakını konaklama", chip: false },
  { path: "/avsa-adasina-ne-zaman-gidilir/", label: "Ne Zaman Gidilir?", icon: "📅", short: "Aylara göre deniz, hava, kalabalık ve rüzgar", chip: false },
  { path: "/avsa-sarabi-saraphaneler/", label: "Şarap ve Şaraphaneler", icon: "🍷", short: "Adakarası, Bortaçina ve Büyülübağ: şarap tadımı rehberi", chip: false },
  { path: "/plajlar/", label: "Plajlar", icon: "🏖️", short: "Altınkum'dan Çınar Koyu'na adadaki plaj ve koylar" },
  { path: "/gezilecek-yerler/", label: "Gezilecek Yerler", icon: "🧭", short: "Köyler, manastır, şaraphaneler ve gün batımı noktaları" },
  { path: "/gece-hayati/", label: "Gece Hayatı", icon: "🌙", short: "Barlar Sokağı ve akşam eğlencesi rehberi" },
  { path: "/feribot-saatleri/", label: "Feribot Saatleri", icon: "⛴️", short: "Erdek, Tekirdağ ve İstanbul hatlarının sefer saatleri" },
  { path: "/avsada-ne-yenir/", label: "Avşa'da Ne Yenir?", icon: "🐟", short: "Yöresel lezzetler, deniz ürünleri ve yeme-içme rehberi", chip: false },
  { path: "/gestas-erdek-avsa/", label: "GESTAŞ Erdek–Avşa", icon: "🚢", short: "GESTAŞ seferleri, bilet ve ücretler", chip: false },
  { path: "/marmara-roro-erdek-avsa/", label: "Marmara RoRo Erdek–Avşa", icon: "🚢", short: "Marmara RoRo yaz ve kış tarifesi, Tekirdağ hattı", chip: false },
  { path: "/ido-avsa-seferleri/", label: "İDO Avşa Seferleri", icon: "🚤", short: "Son seferler 22 Kasım, nisana kadar sefer yok", chip: false },
  { path: "/tekirdag-avsa-feribot/", label: "Tekirdağ–Avşa Feribot", icon: "⛴️", short: "Kış tarifesi: cuma ve pazar seferleri", chip: false },
  { path: "/avsa-adasi-havadan/", label: "Havadan Avşa", icon: "🚁", short: "Drone ile çekilmiş tüm ada videosu" },
  { path: "/kisin-avsa-adasi/", label: "Kışın Avşa", icon: "❄️", short: "Kış feribot seferleri, açık işletmeler ve ipuçları", chip: false },
  { path: "/avsa-feribot-seferleri-iptal/", label: "Sefer İptali", icon: "🌬️", short: "Feribot seferi iptal mi? Nereden öğrenilir, ne yapılır", chip: false },
  { path: "/bilet-fiyatlari/", label: "Bilet Fiyatları", icon: "🎟️", short: "Yolcu ve araç feribot bilet ücretleri" },
  { path: "/avsa-adasi-tatil-maliyeti/", label: "Tatil Maliyeti", icon: "🧮", short: "Feribot ve konaklama için örnek bütçe hesabı", chip: false },
];

// Tarifelerin derlendiği tarih (sayfalarda "son kontrol" olarak gösterilir)
export const TARIFE_KONTROL = "24 Ekim 2026";

// Ana sayfadaki hızlı bağlantı şeridi (hava durumu butonundan sonra gelir; sıra burada belirlenir)
export const homeChipPaths = [
  "/avsa-adasi-gezi-rotasi",
  "/yigitler-konaklama",
  "/avsa-feribot-seferleri-iptal",
  "/kisin-avsa-adasi",
  "/avsa-adasi-havadan",
];
