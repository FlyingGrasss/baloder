"use client"
import { Mail, Home, Bell, Heart, Wallet } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 z-50">
      <button
        onClick={() => router.push('/')}
        className={`flex flex-col items-center gap-1 cursor-pointer ${pathname === '/' ? 'text-bordeaux' : 'text-gray-400'}`}
      >
        <Home size={20} />
        <span className="text-[10px] font-bold">Ana Sayfa</span>
      </button>
      <button
        onClick={() => router.push('/duyurular')}
        className={`flex flex-col items-center gap-1 cursor-pointer ${pathname === '/duyurular' ? 'text-bordeaux' : 'text-gray-400'}`}
      >
        <Bell size={20} />
        <span className="text-[10px] font-bold">Duyurular</span>
      </button>
      <button
        onClick={() => router.push('/bagis')}
        className={`flex flex-col items-center gap-1 cursor-pointer ${pathname === '/bagis' ? 'text-bordeaux' : 'text-gray-400'}`}
      >
        <Heart size={20} />
        <span className="text-[10px] font-bold">Bağış</span>
      </button>
      <button
        onClick={() => router.push('/cuzdan')}
        className={`flex flex-col items-center gap-1 cursor-pointer ${pathname === '/cuzdan' ? 'text-bordeaux' : 'text-gray-400'}`}
      >
        <Wallet size={20} />
        <span className="text-[10px] font-bold">Cüzdan</span>
      </button>
      <button
        onClick={() => router.push('/iletisim')}
        className={`flex flex-col items-center gap-1 cursor-pointer ${pathname === '/iletisim' ? 'text-bordeaux' : 'text-gray-400'}`}
      >
        <Mail size={20} />
        <span className="text-[10px] font-bold">İletişim</span>
      </button>
    </div>
  );
}