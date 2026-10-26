import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-amber-50/40 px-5 text-center">
      <h1 className="font-serif text-4xl font-bold text-sky-900">Bu işletmeyi bulamadık</h1>
      <p className="text-slate-600">Adres yanlış olabilir ya da işletme listeden kaldırılmış olabilir.</p>
      <Link href="/#konaklama" className="rounded-full bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-900">
        Tüm konaklamalara dön
      </Link>
    </main>
  );
}
