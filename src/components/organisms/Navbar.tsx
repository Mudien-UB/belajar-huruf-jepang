import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-sakura bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-navy">
              BelajarJepang
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-navy hover:text-sakura px-2 sm:px-3 py-2 rounded-md font-medium text-sm sm:text-base">
              Home
            </Link>
            <Link href="/hiragana" className="text-navy hover:text-sakura px-2 sm:px-3 py-2 rounded-md font-medium text-sm sm:text-base">
              Hiragana
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
