export default function Footer() {
  return (
    <footer className="border-t border-sakura bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-gold">
        &copy; {new Date().getFullYear()} Belajar Bahasa Jepang. All rights reserved.
      </div>
    </footer>
  );
}
