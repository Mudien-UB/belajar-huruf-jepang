import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 sm:p-8 text-center text-foreground gap-5">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-navy">Belajar Huruf Jepang</h1>
      <Link 
        href="/hiragana" 
        className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all bg-sakura text-navy hover:opacity-90"
      >
        Mulai Belajar Hiragana
      </Link>
    </div>
  );
}
