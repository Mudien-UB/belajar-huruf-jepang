import Link from "next/link";

export default function HiraganaHub() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 text-center text-foreground">
      <h1 className="text-5xl font-bold mb-4 text-navy">Belajar Huruf Jepang</h1>
      <p className="text-xl mb-12">Hiragana</p>

      <div className="flex flex-col gap-4">
        <Link 
          href="/hiragana/pengenalan"
          className="px-8 py-4 rounded-xl font-bold text-lg transition-all bg-sakura text-navy hover:opacity-90"
        >
          Pengenalan
        </Link>
        <Link 
          href="/hiragana/latihan/menulis"
          className="px-8 py-4 rounded-xl font-bold text-lg transition-all bg-muted-gold text-paper hover:opacity-90"
        >
          Latihan Menulis
        </Link>
        <Link
          href="/hiragana/latihan/sambung-cocok"
          className="px-8 py-4 rounded-xl font-bold text-lg transition-all bg-navy text-paper hover:opacity-90"
        >
          Latihan Sambung Cocok
        </Link>
      </div>
    </div>
  );
}
