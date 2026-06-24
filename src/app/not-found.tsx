import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-paper text-navy">
      <h1 className="text-8xl font-serif font-bold mb-4">404</h1>
      <p className="text-2xl font-serif mb-8">Halaman tidak ditemukan</p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full border-2 border-sakura text-navy font-semibold hover:bg-sakura hover:text-white transition-all duration-300"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
