import pkg from "../../../package.json";

export default function Footer() {
  return (
    <footer className="border-t border-sakura bg-background py-6">
      <div className="max-w-7xl mx-auto px-4 text-sm text-muted-gold flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Belajar Huruf Jepang. All rights reserved.</p>
        <p>
          Made with ❤️ by{' '}
          <a
            href="https://github.com/Mudien-UB"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline underline-offset-2"
          >
            MudienUB
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/Mudien-UB/belajar-huruf-jepang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline underline-offset-2"
          >
            Source Code
          </a>{' '}
          | Version {pkg.version}
        </p>
      </div>
    </footer>
  );
}
