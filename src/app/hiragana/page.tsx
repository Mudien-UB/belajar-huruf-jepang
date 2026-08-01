import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Daftar Huruf Hiragana",
    description: "Pusat belajar huruf Hiragana Jepang, mencakup pengenalan dan latihan.",
};

export default function HiraganaHub() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 sm:p-8 text-center text-foreground">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-navy">Belajar Huruf Jepang</h1>
      <p className="text-lg sm:text-xl mb-8 sm:mb-12">Hiragana</p>

      <div className="flex flex-col w-full max-w-sm gap-4">
        <Link 
          href="/hiragana/pengenalan"
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all bg-sakura text-navy hover:opacity-90"
        >
          Pengenalan
        </Link>
        <Link 
          href="/hiragana/latihan/menulis"
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all bg-muted-gold text-paper hover:opacity-90"
        >
          Latihan Menulis
        </Link>
        <Link
          href="/hiragana/latihan/sambung-cocok"
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all bg-navy text-paper hover:opacity-90"
        >
          Latihan Sambung Cocok
        </Link>
      </div>
    </div>
  );
}
