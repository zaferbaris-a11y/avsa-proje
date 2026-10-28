// Konsept (olanak/arama niyeti) sayfaları: liste stays.ts'ten otomatik üretilir.
// Yeni tesis eklediğinde ya da olanak yazdığında bu sayfalar kendiliğinden güncellenir.
import { stays, featuresOf, type Stay } from "./stays";

const has = (s: Stay, key: string) => featuresOf(s).some((f) => f.key === key);

export interface Konsept {
  path: string; // /avsa-havuzlu-oteller/
  label: string; // kısa bağlantı metni
  title: string;
  description: string;
  h1: string;
  intro: (n: number) => string;
  filter: (s: Stay) => boolean;
  why: { h: string; p: string[] };
  tips: string[];
  faq: { q: string; a: string }[];
  priority?: number;
}

export const konseptler: Konsept[] = [
  {
    path: "/avsa-denize-sifir-konaklama/",
    label: "Denize sıfır ve yakın konaklama",
    title: "Avşa Denize Sıfır Oteller, Pansiyonlar ve Apartlar | avsaadasi.net",
    description:
      "Avşa Adası'nda denize sıfır ve denize yürüme mesafesindeki otel, pansiyon ve apartlar. Merkez, Yiğitler ve Değirmenardı'ndan seçenekleri karşılaştır.",
    h1: "Avşa'da Denize Sıfır ve Denize Yakın Konaklama",
    intro: (n) =>
      `Avşa Adası'nda denize sıfır ya da denize yürüme mesafesinde olan ${n} tesisi bir arada topladık. Otel, pansiyon ve apart seçeneklerini bölgeye göre karşılaştırıp doğrudan işletmeyle WhatsApp'tan görüşebilirsin.`,
    filter: (s) => has(s, "deniz"),
    why: {
      h: "Denize sıfır ne demek, nasıl seçilir?",
      p: [
        "Denize sıfır; tesisin kapısından denize kısa bir yürüyüşle ya da doğrudan sahile inilebilen konumu anlatır. Avşa'da bu ifade her tesiste aynı mesafeyi göstermez: kimi tesis kumsalın hemen kenarındadır, kimi birkaç yüz metre içeridedir. Bu yüzden her tesis sayfasındaki 'denize mesafe' bilgisine bakmanı öneririz.",
        "Denizin yanında kalmanın kolaylığı yanında dikkat edilecek iki şey var: sezon boyunca sahile yakın bölgeler daha hareketli olabilir ve fiyatlar genelde plajdan uzak tesislere göre yüksektir. Sessiz bir tatil istiyorsan konumu bölgeyle birlikte değerlendir.",
      ],
    },
    tips: [
      "Mesafeyi tesis sayfasından ve işletmeden teyit et; 'denize yakın' ifadesi 50 metreden birkaç yüz metreye kadar değişebilir.",
      "Plajın kumlu mu çakıllı mı olduğu ve ücretli şezlong düzeni için plajlar rehberine bak.",
      "Yaz hafta sonları ve bayramlarda denize yakın tesisler ilk dolanlar arasında; erken sor.",
      "Bagajla gelecekseniz iskeleden tesise ulaşım ve otopark durumunu öğren.",
    ],
    faq: [
      { q: "Avşa'da denize sıfır tesis var mı?", a: "Evet. Merkezde, Yiğitler'de ve Değirmenardı'nda denize sıfır ya da denize çok yakın otel, pansiyon ve apartlar var. Güncel liste bu sayfada." },
      { q: "Denize sıfır konaklama daha pahalı mı?", a: "Genel olarak sahile yakın tesisler daha içerideki tesislere göre pahalı olabilir ama bu fark tesise ve sezona göre değişiyor. Gerçek fiyat için işletmeye WhatsApp'tan yazabilirsin." },
      { q: "Denize sıfır tesisi hangi bölgede aramalıyım?", a: "Eğlenceye ve iskeleye yakın olmak istiyorsan Merkez, daha sakin bir tatil için Yiğitler veya Değirmenardı uygun olabilir. Bölge karakterleri için Avşa Adası rehberine bak." },
    ],
  },
  {
    path: "/avsa-havuzlu-oteller/",
    label: "Havuzlu oteller",
    title: "Avşa Havuzlu Oteller ve Aquaparklı Tesisler | avsaadasi.net",
    description:
      "Avşa Adası'nda havuzlu, aquaparklı ve kaydıraklı oteller. Çocuklu aileler ve havuz keyfi isteyenler için tesisleri bölge ve fiyatlarıyla karşılaştır.",
    h1: "Avşa'da Havuzlu Oteller ve Aquaparklı Tesisler",
    intro: (n) =>
      `Avşa Adası'nda açık havuzu, aquaparkı ya da çocuk havuzu bulunan ${n} tesisi listeledik. Deniz kadar havuz da istiyorsan bu sayfadan başlayabilirsin.`,
    filter: (s) => has(s, "havuz"),
    why: {
      h: "Avşa'da havuzlu otel neden tercih ediliyor?",
      p: [
        "Havuz, özellikle çocuklu ailelerin ve deniz sonrası dinlenmek isteyenlerin vazgeçilmezi. Rüzgarlı ya da dalgalı günlerde denize girilemediğinde havuz tatili kurtarıyor. Bazı tesislerde havuzun yanında aquapark, su kaydırağı ya da çocuk havuzu da bulunuyor.",
        "Havuz bilgisi tesisten tesise değişir: açık mı kapalı mı, ısıtmalı mı, çocuk bölümü var mı gibi ayrıntıları rezervasyondan önce işletmeden teyit etmek gerekir.",
      ],
    },
    tips: [
      "Havuzun sezon açılış ve kapanış tarihlerini sor; mayıs başı ve eylül sonu havuz kapalı olabilir.",
      "Çocuklu aileler için çocuk havuzu ve havuz derinliği bilgisini öğren.",
      "Şezlong ve şemsiyenin ücretsiz olup olmadığını kontrol et.",
      "Havuz saatleri ve kuralları (bone, duş) tesise göre değişir.",
    ],
    faq: [
      { q: "Avşa'da aquaparklı otel var mı?", a: "Evet, sitemizde aquapark ve su kaydırağı olan oteller listeleniyor. Liste bu sayfada otomatik güncellenir." },
      { q: "Havuzlu oteller çocuklar için uygun mu?", a: "Çocuk havuzu ya da aquapark olan tesisler aileler için uygun. Ayrıntılar için tesis sayfalarına ve işletmeye bakın." },
      { q: "Havuz ücretsiz mi?", a: "Havuz kullanım koşulları tesise göre değişir. Ücretsiz olup olmadığını, dışarıdan misafir girişini ve şezlong düzenini işletmeye sorun." },
    ],
  },
  {
    path: "/avsa-kahvalti-dahil-oteller/",
    label: "Kahvaltı dahil oteller",
    title: "Avşa Kahvaltı Dahil ve Yarım Pansiyon Oteller | avsaadasi.net",
    description:
      "Avşa Adası'nda kahvaltı dahil ve yarım pansiyon oteller. Açık büfe kahvaltı sunan tesisleri bölge ve oda fiyatlarıyla karşılaştır.",
    h1: "Avşa'da Kahvaltı Dahil ve Yarım Pansiyon Oteller",
    intro: (n) =>
      `Avşa Adası'nda kahvaltısı dahil ya da yarım pansiyon seçeneği sunan ${n} otel ve tesisi bu sayfada topladık. Sabah derdi olmadan güne başlamak isteyenler için.`,
    filter: (s) => has(s, "kahvalti") || has(s, "yarim"),
    why: {
      h: "Kahvaltı dahil mi, dışarıda mı?",
      p: [
        "Kahvaltı dahil konaklama pratik: sabah saatinden tasarruf eder, bütçeyi baştan netleştirir. Açık büfe kahvaltı sunan tesislerde çeşit genelde fazla olur. Yarım pansiyon ise kahvaltıya ek olarak akşam yemeğini de kapsar ve çoğunlukla aile ve gruplar için uygun.",
        "Öte yandan mutfaklı apart ya da pansiyonda kalıp yemeği kendin hazırlamak ya da adadaki restoranlarda yemek de ekonomik olabilir. Hangisi uygun olduğuna kaç kişi olduğunuza ve kaç gece kalacağınıza göre karar verebilirsin.",
      ],
    },
    tips: [
      "Kahvaltının fiyata dahil olup olmadığını ve hangi saatlerde verildiğini sor.",
      "Yarım pansiyonda akşam yemeğinin menüsü ve içecek dahil olup olmadığını öğren.",
      "Çocuk fiyatlandırmasını (kahvaltı dahil) ayrıca sor.",
      "Sezon dışında bazı tesislerde kahvaltı servisi sınırlı olabilir.",
    ],
    faq: [
      { q: "Avşa'da açık büfe kahvaltı sunan otel var mı?", a: "Evet, bu sayfadaki bazı oteller açık büfe kahvaltı sunuyor. Dahil olan hizmetler sezona göre değişebilir, işletmeden teyit alın." },
      { q: "Yarım pansiyon nedir?", a: "Kahvaltıya ek olarak akşam yemeğinin de fiyata dahil olduğu konaklama türüdür." },
      { q: "Kahvaltı dahil fiyat nasıl öğrenilir?", a: "Tesis sayfasındaki WhatsApp düğmesinden tarih ve kişi sayısını yazarak güncel fiyatı öğrenebilirsin." },
    ],
  },
  {
    path: "/avsa-cocuklu-aile-konaklama/",
    label: "Çocuklu aileler için konaklama",
    title: "Avşa Çocuklu Aile Konaklama: Aile Dostu Oteller ve Moteller | avsaadasi.net",
    description:
      "Avşa Adası'nda çocuklu aileler için aile dostu oteller ve moteller. Aquapark, çocuk havuzu, oyun parkı ve geniş odalı tesisleri karşılaştır.",
    h1: "Avşa'da Çocuklu Aileler İçin Konaklama",
    intro: (n) =>
      `Avşa Adası'nda çocuklu aileler için uygun ${n} tesisi bir araya getirdik: aquaparklı oteller, oyun parkı ve aile odası olan moteller.`,
    filter: (s) => has(s, "cocuk"),
    why: {
      h: "Çocukla Avşa tatilinde nelere dikkat edilir?",
      p: [
        "Çocuklarla tatilde konaklamanın seçimi, günün nasıl geçeceğini belirliyor. Havuzu, aquaparkı ya da oyun alanı olan tesisler gün içi eğlenceyi kolaylaştırır. Aile odası ya da geniş kapasiteli oda ise bir arada kalmayı rahatlatır.",
        "Plajın sığ ve kumlu olması da çocuklar için önemli: hangi koyun çocuklara uygun olduğunu plajlar rehberinde anlattık. Tesisin plaja uzaklığı ve iskeleye mesafesi bagaj ve çocuk arabası taşımayı da etkiler.",
      ],
    },
    tips: [
      "Çocuk yaş sınırı ve çocuk fiyatını önceden sor.",
      "Bebek yatağı ve mama sandalyesi gibi ek ihtiyaçları işletmeyle konuş.",
      "Oda kapasitesini ve ek yatak seçeneğini kontrol et.",
      "Havuz ve oyun alanının çalışma saatlerini öğren.",
    ],
    faq: [
      { q: "Avşa'da çocuklar için uygun otel var mı?", a: "Evet. Aquapark, çocuk havuzu ve oyun parkı olan oteller ile aile odası sunan moteller bu sayfada." },
      { q: "Çocuklu aileler hangi bölgede kalmalı?", a: "Plaja yakın ve gece hayatından uzak bir konum genelde daha rahat olur. Bölgeler için Avşa Adası rehberine bakabilirsin." },
      { q: "Çocuk için ek yatak verilir mi?", a: "Tesise göre değişir. Rezervasyon sırasında işletmeye sorun." },
    ],
  },
  {
    path: "/avsa-mutfakli-apartlar/",
    label: "Mutfaklı apart ve konaklama",
    title: "Avşa Mutfaklı Apartlar ve Konaklama Seçenekleri | avsaadasi.net",
    description:
      "Avşa Adası'nda mutfaklı apart daireler, pansiyonlar ve oteller. Yemeğini kendin hazırlamak isteyen aileler ve gruplar için mutfaklı tesisler.",
    h1: "Avşa'da Mutfaklı Apartlar ve Konaklama",
    intro: (n) =>
      `Avşa Adası'nda mutfağı bulunan ${n} tesisi listeledik. Uzun konaklamalar, kalabalık aileler ve bütçe düşünenler için mutfaklı daireler pratik bir çözüm.`,
    filter: (s) => s.amenities.some((a) => /mutfak/i.test(a)),
    why: {
      h: "Mutfaklı konaklama kimlere uygun?",
      p: [
        "Mutfaklı apart; çay, kahvaltı ve hafif yemekleri kendin hazırlamak isteyenler, bebekli aileler ve birkaç gece kalacaklar için avantajlı. Restoran maliyetini azaltır, evde gibi hissettirir.",
        "Mutfağın donanımı tesise göre değişir: bazılarında ocak, buzdolabı ve temel mutfak eşyaları bulunur. Bazı tesislerde tam donanımlı mutfak ya da ortak mutfak olabilir. Tesis sayfasındaki olanaklara ve işletmeye bakmak gerekir.",
      ],
    },
    tips: [
      "Mutfakta hangi eşyaların (tava, tencere, tabak) bulunduğunu sor.",
      "Adada market ve manav durumunu bilmek için Avşa rehberine bak.",
      "Mutfak temizliği ve çıkış kuralları hakkında bilgi al.",
      "Büyük gruplar için 2+1 ya da daha büyük daire seçeneklerini sor.",
    ],
    faq: [
      { q: "Avşa'da mutfaklı apart var mı?", a: "Evet, sitemizdeki birçok apart ve pansiyon mutfak sunuyor. Liste bu sayfada otomatik güncellenir." },
      { q: "Mutfaklı apart otelden ucuz mu?", a: "Çoğu zaman yemek masrafını azalttığı için ekonomik olabilir ama fiyat sezona ve tesise göre değişir." },
      { q: "Mutfakta ne kadar donanım var?", a: "Tesise göre değişir. Rezervasyondan önce işletmeye sorarak ihtiyacını teyit et." },
    ],
  },
  {
    path: "/avsa-uygun-fiyatli-konaklama/",
    label: "Uygun fiyatlı konaklama",
    title: "Avşa Uygun Fiyatlı ve Ekonomik Konaklama | avsaadasi.net",
    description:
      "Avşa Adası'nda uygun fiyatlı pansiyon, motel ve apartlar. Gecelik başlangıç fiyatlarına göre ekonomik konaklama seçeneklerini karşılaştır.",
    h1: "Avşa'da Uygun Fiyatlı ve Ekonomik Konaklama",
    intro: (n) =>
      `Avşa Adası'nda gecelik başlangıç fiyatı düşük olan ${n} tesisi bu sayfada topladık. Bütçeni önce netleştirip sonra konum ve olanaklara göre seçebilirsin.`,
    filter: (s) => s.priceFrom > 0 && s.priceFrom <= 3000,
    why: {
      h: "Avşa'da ekonomik konaklama nasıl bulunur?",
      p: [
        "Avşa'da pansiyon, motel ve apart daireler genelde otellere göre daha uygun fiyatlı. Bunun yanında hafta içi, mayıs-haziran başı ve eylül gibi sezon kenarı tarihler yüksek sezona göre daha ucuz olabilir.",
        "Sayfada yazan fiyatlar başlangıç fiyatıdır ve oda tipine, tarihe ve kişi sayısına göre değişir. Kesin fiyat için işletmeyle WhatsApp'tan görüşmek gerekir.",
      ],
    },
    tips: [
      "Hafta içi ya da sezon kenarı tarihlerde fiyatlar düşebilir.",
      "Fiyatın kişi başı mı oda başı mı olduğunu mutlaka sor.",
      "Mutfaklı apartlar yemek masrafını azaltarak toplam maliyeti düşürebilir.",
      "Erken rezervasyon indirimi olup olmadığını öğren.",
    ],
    faq: [
      { q: "Avşa'da en uygun konaklama ne kadar?", a: "Sayfadaki başlangıç fiyatları bir fikir verir ancak sezona ve tarihe göre değişir. Güncel fiyat için işletmeye yazın." },
      { q: "Ucuz konaklamada neleri kontrol etmeliyim?", a: "Klima, sıcak su, Wi-Fi, denize mesafe ve temizlik gibi olanakları işletmeden teyit edin." },
      { q: "Fiyatlar sezonda artar mı?", a: "Evet. Temmuz-ağustos ve bayram hafta sonları fiyatlar yükselir, erken rezervasyon avantaj sağlayabilir." },
    ],
  },
  {
    path: "/avsa-motelleri/",
    label: "Moteller",
    title: "Avşa Adası Motelleri ve Fiyatları | avsaadasi.net",
    description:
      "Avşa Adası'ndaki moteller: bölgesi, olanakları ve gecelik başlangıç fiyatlarıyla sade ve merkezi konaklama seçeneklerini karşılaştır.",
    h1: "Avşa Adası Motelleri",
    intro: (n) =>
      `Avşa Adası'nda motel adıyla hizmet veren ${n} tesisi bu sayfada topladık. Bölgeye, olanaklara ve gecelik başlangıç fiyatına göre karşılaştırıp işletmeyle doğrudan görüşebilirsin.`,
    filter: (s) => s.kind === "Motel" || /motel/i.test(s.name),
    why: {
      h: "Motel mi, otel mi, pansiyon mu?",
      p: [
        "Avşa'da motel adıyla geçen tesisler genelde otellere göre daha sade: oda, klima, balkon ve banyo gibi temel olanaklara odaklanır; havuz, aquapark gibi eğlence olanakları çoğunlukla yoktur. Bunun karşılığında merkezi konumları ve sade yapıları öne çıkar.",
        "Adlandırma tesisten tesise değişiyor: bazı yerler kaynaklarda hem motel hem apart ya da pansiyon adıyla geçiyor. Bu yüzden ad yerine tesis sayfasındaki olanak ve oda bilgisine bakmanı öneririz.",
      ],
    },
    tips: [
      "Havuz ya da aquapark istiyorsan havuzlu oteller sayfasına bak; motellerin çoğunda havuz yok.",
      "Odada mutfak olup olmadığını tesis sayfasından ve işletmeden teyit et.",
      "Fiyatın oda başı mı kişi başı mı olduğunu ve kahvaltının dahil olup olmadığını sor.",
      "Yaz hafta sonları ve bayramlarda erken rezervasyon yap.",
    ],
    faq: [
      { q: "Avşa'da motel ile otel arasındaki fark nedir?", a: "Moteller genelde daha sade ve daha az olanaklıdır; oteller havuz, restoran gibi ek olanaklar sunabilir. Her tesisin olanağı farklıdır, tesis sayfasına bakın." },
      { q: "Avşa'da motellerde kahvaltı dahil mi?", a: "Tesise göre değişir. Her tesis sayfasında olanak listesi var, kesin bilgi için işletmeye WhatsApp'tan yazabilirsin." },
      { q: "Motel fiyatları sezonda değişir mi?", a: "Evet. Sayfadaki fiyatlar başlangıç fiyatıdır; tarih, oda tipi ve kişi sayısına göre işletme güncel fiyatı verir." },
    ],
  },
  {
    path: "/avsa-aquaparkli-oteller/",
    label: "Aquaparklı oteller",
    title: "Avşa Aquaparklı Oteller ve Su Kaydıraklı Tesisler | avsaadasi.net",
    description:
      "Avşa Adası'nda aquaparklı ve su kaydıraklı oteller. Çocuklu aileler için olanaklarıyla ve bölgesiyle tesisleri karşılaştır.",
    h1: "Avşa'da Aquaparklı Oteller",
    intro: (n) =>
      `Avşa Adası'nda aquapark ya da su kaydırağı olan ${n} tesisi bu sayfada listeledik. Havuz keyfini çocuklarla birlikte yaşamak isteyenler buradan başlayabilir.`,
    filter: (s) => /aquapark|kaydırak/i.test([s.tag, s.tagline, ...s.amenities, ...s.rooms.map((r) => r.name)].join(" ")),
    why: {
      h: "Aquaparklı otel seçerken nelere bakmalı?",
      p: [
        "Aquaparklı tesislerde havuz, kaydırak ve çocuk havuzu aynı yerde olduğu için gün içinde denize gitmeden de vakit geçirmek mümkün. Yine de denize mesafeyi ve aquapark kullanımının fiyata dahil olup olmadığını tesise sormak gerekir.",
        "Bazı tesisler aquaparkını konuk olmayanlara da açabiliyor, bazıları sadece konuklarına. Giriş koşulları ve açık olduğu saatler tesise göre değişir.",
      ],
    },
    tips: [
      "Kaydırak ve havuzun hangi yaş ve boy sınırlarına açık olduğunu sor.",
      "Aquapark girişinin konaklama fiyatına dahil olup olmadığını teyit et.",
      "Sezon açılış ve kapanış tarihlerini öğren; aquaparklar genelde yaz sezonunda hizmet verir.",
      "Plaj için denize mesafeyi tesis sayfasından kontrol et.",
    ],
    faq: [
      { q: "Avşa'da aquaparklı otel var mı?", a: "Evet, bu sayfada aquapark ya da su kaydırağı olan tesisleri listeliyoruz. Güncel olanaklar için işletmeye yazabilirsin." },
      { q: "Aquapark çocuklar için uygun mu?", a: "Çocuk havuzu ve kaydırak olan tesisler çocuklu aileler için uygun olabilir. Yaş ve boy sınırlarını tesisten öğren." },
      { q: "Aquaparklı otelde yemek dahil mi?", a: "Tesise göre değişir. Kahvaltı ve akşam yemeği koşullarını tesis sayfasında ve işletmeden kontrol edin." },
    ],
  },
  {
    path: "/barlar-sokagina-yakin-konaklama/",
    label: "Barlar Sokağı'na yakın konaklama",
    title: "Avşa Barlar Sokağı'na Yakın Otel, Pansiyon ve Apart | avsaadasi.net",
    description:
      "Avşa'da Barlar Sokağı'na yürüme mesafesindeki otel, pansiyon ve apartlar. Gece hayatına yakın konaklamayı mesafeleriyle karşılaştır.",
    h1: "Avşa'da Barlar Sokağı'na Yakın Konaklama",
    intro: (n) =>
      `Avşa Adası'nda Barlar Sokağı'na mesafesi belirtilen ${n} tesisi bu sayfada topladık. Akşam eğlencesine yürüyerek gitmek isteyenler için mesafeleri tesis bazında görebilirsin.`,
    filter: (s) => s.nearby.some((n) => /barlar/i.test(n.label)),
    why: {
      h: "Barlar Sokağı'na yakın kalmanın artıları ve eksileri",
      p: [
        "Barlar Sokağı'na yakın kalmak, gece dönüş yolunu kısaltır ve yürüyerek gidip gelmeyi sağlar. Arkadaş grupları ve akşam eğlenceyi sevenler için bu konum rahattır.",
        "Öte yandan gece hayatına yakın bölgelerde akşam ve gece saatlerinde ses olabilir. Sessiz uyumak istiyorsan odanın hangi cepheye baktığını işletmeye sor, ya da daha sakin Yiğitler'e bak.",
      ],
    },
    tips: [
      "Odanın sokağa mı arka cepheye mi baktığını sor.",
      "Barlar Sokağı'nın yanında disko bölgesine de mesafe belirtiliyorsa tesis sayfasından kontrol et.",
      "Gece hayatı rehberimizde bölgenin saatlerini ve genel düzenini okuyabilirsin.",
      "Sakin bir tatil istiyorsan Yiğitler konaklama sayfasına göz at.",
    ],
    faq: [
      { q: "Barlar Sokağı Avşa'nın neresinde?", a: "Barlar Sokağı Avşa Merkez'dedir. Bu sayfadaki tesislerin Barlar Sokağı'na mesafeleri tesis sayfalarında yazıyor." },
      { q: "Barlar Sokağı'na yakın tesis gürültülü olur mu?", a: "Eğlence bölgesine yakın tesislerde akşam ve gece sesi olabilir. Oda cephesini ve gece sessizlik düzenini işletmeye sor." },
      { q: "Arkadaş grubu için hangi bölge uygun?", a: "Gece hayatına yürümek isteyen gruplar Merkez'i tercih edebilir; sakin bir tatil için Yiğitler ve Değirmenardı uygundur." },
    ],
  },
  {
    path: "/iskeleye-yakin-konaklama/",
    label: "İskeleye yakın konaklama",
    title: "Avşa İskeleye Yakın Otel, Pansiyon ve Apart | avsaadasi.net",
    description:
      "Avşa'da iskeleye yürüme mesafesindeki konaklama seçenekleri. Feribottan inince hızla yerleşmek isteyenler için mesafeleriyle tesis listesi.",
    h1: "Avşa'da İskeleye Yakın Konaklama",
    intro: (n) =>
      `Avşa Adası'nda iskeleye mesafesi belirtilen ${n} tesisi bu sayfada topladık. Feribottan inince bagajla uzun yürümek istemeyenler, günübirlik ya da kısa tatil planlayanlar için pratik bir başlangıç.`,
    filter: (s) => s.nearby.some((n) => /[İi]skele/.test(n.label)),
    why: {
      h: "İskeleye yakın kalmak neden avantajlı?",
      p: [
        "Feribottan indikten sonra tesise kısa sürede ulaşmak, özellikle bagajlı ve çocuklu gelenler için rahatlık sağlar. Dönüş günü feribot saatine yetişmek de kolaylaşır.",
        "Adada Merkez ve Yiğitler gibi farklı bölgelerde iskeleler var. Tesise yakın iskeleyi ve feribot seferinin hangi iskeleye yanaştığını yola çıkmadan öğrenmen gerekir; feribot saatleri ve ulaşım sayfalarımız bu konuda yardımcı olur.",
      ],
    },
    tips: [
      "Feribot saatini bilet almadan önce kontrol et; saatler sezona göre değişir.",
      "Tesis sayfasındaki iskele adını ve mesafeyi işletmeden teyit et.",
      "Erken giriş ve geç çıkış için işletmeyle önceden konuş.",
      "Araçla gelecekseniz otopark durumunu sor.",
    ],
    faq: [
      { q: "Avşa'da iskeleye en yakın bölge neresi?", a: "Merkez bölgesi iskeleye en yakın bölgedir. Yiğitler'de de bir iskele var. Tesisin mesafesi tesis sayfasında yazıyor." },
      { q: "İskeleden tesise nasıl gidilir?", a: "Mesafesi kısa olan tesislere yürüyerek gidilebilir. Bagaj ya da uzaklık için işletmeden transfer bilgisi isteyebilirsin." },
      { q: "Feribot saatine göre erken giriş mümkün mü?", a: "Tesise göre değişir. Erken giriş ve geç çıkış için işletmeye önceden yazman gerekir." },
    ],
  },
  {
    path: "/avsa-kalabalik-grup-konaklama/",
    label: "4+ kişilik oda ve grup konaklama",
    title: "Avşa 4 Kişilik Oda ve Kalabalık Grup Konaklama | avsaadasi.net",
    description:
      "Avşa'da 4 ve daha fazla kişilik odası olan otel, pansiyon ve apartlar. Aile, kalabalık grup ve arkadaş tatili için konaklama seçenekleri.",
    h1: "Avşa'da 4 Kişilik ve Kalabalık Grup Konaklama",
    intro: (n) =>
      `Avşa Adası'nda 4 ya da daha fazla kişilik odası bulunan ${n} tesisi bu sayfada listeledik. Aile, akraba ya da arkadaş grubuyla gelenler kapasiteye göre karşılaştırabilir.`,
    filter: (s) => s.rooms.some((r) => r.capacity >= 4),
    why: {
      h: "Kalabalık grupla konaklama nasıl planlanır?",
      p: [
        "Dört kişilik bir odada ya da birden fazla odada kalmak fiyat ve rahatlık açısından farklı sonuç verebilir. Mutfaklı apartlar uzun kalışlarda yemek masrafını düşürürken, otellerde ortak alan ve kahvaltı gibi kolaylıklar öne çıkar.",
        "Gruplarda kişi sayısı ve yaş aralığını rezervasyon öncesinde işletmeye söylemek en sağlıklısı; her tesis grup ve konaklama politikasını kendisi belirler.",
      ],
    },
    tips: [
      "Kişi sayısını, yaş aralığını ve kalış süresini rezervasyondan önce işletmeye bildir.",
      "Ek yatak ve çocuk fiyatı politikasını sor.",
      "Oda sayısı yetiyorsa yan yana ya da aynı kat odalar iste.",
      "Mutfaklı seçenekler için mutfaklı apartlar sayfasına bak.",
    ],
    faq: [
      { q: "Avşa'da 4 kişilik oda var mı?", a: "Evet. Bu sayfadaki tesislerin 4 ve daha fazla kişilik odaları var. Oda tipleri tesis sayfalarında yazıyor." },
      { q: "Kalabalık gruplar için hangi tesis türü uygun?", a: "Mutfaklı apartlar uzun kalışlarda ekonomik olabilir; oteller kahvaltı ve ortak alan avantajı sunar. İhtiyacına göre karşılaştırabilirsin." },
      { q: "Grup rezervasyonunda indirim olur mu?", a: "Tesise göre değişir. Kişi sayısını ve tarihi yazarak işletmeden indirim ve ek yatak koşullarını sorabilirsin." },
    ],
  },
];

export const konseptByPath = (p: string) => konseptler.find((k) => k.path === p);
export const staysFor = (k: Konsept) => stays.filter(k.filter);
