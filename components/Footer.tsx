import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 max-sm:hidden border-red-500 py-12 bg-bordeaux mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 max-sm:gap-4">
        <div className="text-center md:text-left">
          <h4 className="font-bold text-white text-xl mb-1">BALÖDER</h4>
          <p className="text-sm text-white/60 font-medium">
            Bornova Anadolu Lisesi Öğrenci Derneği © 2026
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="https://www.instagram.com/balogrenci/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition text-sm font-bold tracking-widest"
          >
            Instagram
          </a>
          <a
            href="https://linktr.ee/baloder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition text-sm font-bold tracking-widest"
          >
            Linktree
          </a>
          <Link
            href="/bagis"
            className="text-white/80 hover:text-white transition text-sm font-bold tracking-widest"
          >
            Bağış
          </Link>
        </div>
      </div>
    </footer>
  );
}