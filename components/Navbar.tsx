import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b bg-[#A21A2A] border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-4 group min-w-0">
          <div className="bg-white p-0.5 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <Image 
              src="/icon.png" 
              alt="Logo" 
              width={48} 
              height={48} 
              className="rounded-full sm:w-12 sm:h-12"
            />
          </div>
          <span className="text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
            BAL Öğrenci Derneği
          </span>
        </Link>
        
        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden md:flex gap-6 text-white/90 text-sm font-semibold">
            <Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-white transition">İletişim</Link>
          </div>
          <Link 
            href="/bagis" 
            className="bg-white text-[#A21A2A] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm hover:bg-gray-100 transition shadow-md whitespace-nowrap"
          >
            Bağış Yap
          </Link>
        </div>
      </div>
    </nav>
  );
}