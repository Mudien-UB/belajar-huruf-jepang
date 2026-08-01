"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-sakura bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 gap-4 sm:gap-8">
          <Link
            href="/"
            className={`text-navy hover:text-sakura px-2 sm:px-3 py-2 rounded-md font-medium text-sm sm:text-base ${
              pathname === "/" ? "underline underline-offset-4 decoration-2" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/hiragana"
            className={`text-navy hover:text-sakura px-2 sm:px-3 py-2 rounded-md font-medium text-sm sm:text-base ${
              pathname === "/hiragana" ? "underline underline-offset-4 decoration-2" : ""
            }`}
          >
            Hiragana
          </Link>
        </div>
      </div>
    </nav>
  );
}
