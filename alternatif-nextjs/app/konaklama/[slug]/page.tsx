import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { stays, getStay, typeLabels, formatPrice } from "@/data/stays";

const SITE_URL = "https://www.ornek-avsa-sitesi.com"; // kendi alan adınla değiştir

type Props = { params: Promise<{ slug: string }> };

// Her işletme için build sırasında statik sayfa üretir
export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stay = getStay(slug);
  if (!stay) return {};

  const title = `${stay.name} | Avşa Adası ${typeLabels[stay.type]}`;
  return {
    title,
    description: `${stay.tagline} ${stay.area}, Avşa Adası. Gecelik ${formatPrice(stay.priceFrom)}'den başlayan fiyatlarla.`,
    alternates: { canonical: `${SITE_URL}/konaklama/${stay.slug}` },
    openGraph: {
      title,
      description: stay.tagline,
      images: stay.images[0] ? [stay.images[0]] : [],
    },
  };
}

export default async function StayPage({ params }: Props) {
  const { slug } = await params;
  const stay = getStay(slug);
  if (!stay) notFound();

  const similar = stays.filter((s) => s.slug !== stay.slug && s.type === stay.type).slice(0, 3);
  const waLink = (text: string) =>
    `https://wa.me/${stay.whatsapp}?text=${encodeURIComponent(text)}`;

  // Google için yapılandırılmış veri
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": stay.type === "otel" ? "Hotel" : "LodgingBusiness",
    name: stay.name,
    description: stay.description,
    address: { "@type": "PostalAddress", addressLocality: stay.area, addressRegion: "Balıkesir", addressCountry: "TR" },
    priceRange: `${formatPrice(stay.priceFrom)}+`,
    telephone: stay.phone,
    checkinTime: stay.checkIn,
    checkoutTime: stay.checkOut,
    amenityFeature: stay.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
  };

  return (
    <main className="min-h-screen bg-amber-50/40 text-slate-700">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Üst bar */}
      <header className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-xl font-bold text-sky-900">
            Avşa<span className="text-orange-500">.</span>rehber
          </Link>
          <Link href="/#konaklama" className="text-sm font-medium text-sky-700 hover:underline">
            ← Tüm konaklamalar
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4 text-sm text-slate-500">
          <Link href="/" className="hover:underline">Ana sayfa</Link> /{" "}
          <Link href="/#konaklama" className="hover:underline">Konaklama</Link> /{" "}
          <span className="text-slate-700">{stay.name}</span>
        </nav>

        {/* Galeri */}
        <section className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
          {Array.from({ length: stay.images.length > 0 ? Math.min(5, stay.images.length) : 5 }, (_, i) => i).map((i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? "h-72 md:col-span-2 md:row-span-2 md:h-auto" : "h-36"} ${
                stay.images[i] ? "" : `bg-gradient-to-br ${stay.gradient}`
              }`}
            >
              {stay.images[i] && (
                <Image src={stay.images[i]} alt={`${stay.name} fotoğraf ${i + 1}`} fill priority={i === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              )}
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Sol: içerik */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-800">{typeLabels[stay.type]}</span>
              <span className="text-slate-500">📍 {stay.area}, Avşa Adası</span>
            </div>
            <h1 className="mt-3 font-serif text-3xl font-bold text-sky-900 md:text-4xl">{stay.name}</h1>
            <p className="mt-2 text-lg text-orange-600">{stay.tagline}</p>
            <p className="mt-6 leading-relaxed">{stay.description}</p>

            {/* Özellikler */}
            <h2 className="mt-12 font-serif text-2xl font-bold text-sky-900">Olanaklar</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stay.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm shadow-sm">
                  <span className="text-emerald-500">✓</span> {a}
                </li>
              ))}
            </ul>

            {/* Odalar */}
            <h2 className="mt-12 font-serif text-2xl font-bold text-sky-900">
              {stay.type === "apart" ? "Daire seçenekleri" : "Oda seçenekleri"}
            </h2>
            <div className="mt-4 space-y-3">
              {stay.rooms.map((r) => (
                <div key={r.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-5 shadow-sm">
                  <div>
                    <h3 className="font-semibold text-sky-900">{r.name}</h3>
                    <p className="text-sm text-slate-500">
                      {r.capacity} kişilik{r.note ? ` · ${r.note}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-slate-500">
                      <span className="text-lg font-bold text-sky-900">{formatPrice(r.price)}</span> / gece
                    </p>
                    <a
                      href={waLink(`${stay.name} - ${r.name} için müsaitlik ve fiyat bilgisi almak istiyorum.`)}
                      className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-600 hover:text-white"
                    >
                      Sor
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Yakın yerler */}
            <h2 className="mt-12 font-serif text-2xl font-bold text-sky-900">Çevresinde neler var?</h2>
            <ul className="mt-4 divide-y divide-amber-100 rounded-2xl bg-white shadow-sm">
              {stay.nearby.map((n) => (
                <li key={n.label} className="flex justify-between px-5 py-3 text-sm">
                  <span>{n.label}</span>
                  <span className="font-medium text-sky-800">{n.distance}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ: yapışkan rezervasyon kartı */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg">
              <p className="text-sm text-slate-500">Gecelik başlangıç</p>
              <p className="font-serif text-3xl font-bold text-sky-900">{formatPrice(stay.priceFrom)}</p>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-amber-50 p-3">
                  <dt className="text-slate-500">Giriş</dt>
                  <dd className="font-semibold">{stay.checkIn}</dd>
                </div>
                <div className="rounded-xl bg-amber-50 p-3">
                  <dt className="text-slate-500">Çıkış</dt>
                  <dd className="font-semibold">{stay.checkOut}</dd>
                </div>
              </dl>

              <a
                href={waLink(`${stay.name} için müsaitlik ve fiyat bilgisi almak istiyorum.`)}
                className="mt-6 block rounded-full bg-orange-500 py-3 text-center font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02]"
              >
                WhatsApp'tan yaz
              </a>
              {stay.phone && (
                <a href={`tel:${stay.phone.replace(/\s/g, "")}`} className="mt-3 block rounded-full border border-sky-200 py-3 text-center font-semibold text-sky-700 hover:bg-sky-50">
                  Ara: {stay.phone}
                </a>
              )}
              <p className="mt-4 text-center text-xs text-slate-400">Fiyatlar sezona ve doluluğa göre değişebilir.</p>
            </div>
          </aside>
        </div>

        {/* Benzer işletmeler */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-sky-900">Bunlara da göz at</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <Link key={s.slug} href={`/konaklama/${s.slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-lg">
                  <div className={`h-36 bg-gradient-to-br ${s.gradient}`} />
                  <div className="p-5">
                    <h3 className="font-semibold text-sky-900">{s.name}</h3>
                    <p className="text-sm text-slate-500">📍 {s.area} · {formatPrice(s.priceFrom)}'den</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
