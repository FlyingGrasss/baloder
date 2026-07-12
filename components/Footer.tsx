"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/asistan")) return null;

  return (
    <footer className="border-t-4 max-sm:hidden border-red-500 py-12 bg-bordeaux mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 max-sm:gap-4">
        <div className="text-center md:text-left">
          <p className="font-bold text-white text-xl mb-1">BALÖDER</p>
          <p className="text-sm text-white/85 font-medium">
            Bornova Anadolu Lisesi Öğrenci Derneği © 2026
          </p>
          <p className="mt-3 text-xs text-white/85">
            Bu website{" "}
            <a
              href="https://www.instagram.com/emre.bozqurt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:underline"
            >
              Emre Bozkurt&apos;28
            </a>{" "}
            tarafından yapılmıştır.
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
          <a
            href="https://baltimes.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition text-sm font-bold tracking-widest"
          >
            BAL Times
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
