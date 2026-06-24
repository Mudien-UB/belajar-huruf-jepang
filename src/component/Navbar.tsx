import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-sakura bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex space-x-4">
              <Link href="/" className="text-navy hover:text-sakura px-3 py-2 rounded-md font-medium">
                Home
              </Link>
              <Link href="/hiragana" className="text-navy hover:text-sakura px-3 py-2 rounded-md font-medium">
                Hiragana
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
