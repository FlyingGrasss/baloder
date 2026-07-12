"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User, LogOut, Menu, CircleAlert } from "lucide-react";
import { logout } from "@/actions/logout";

export default function NavbarClient({ user }: { user: unknown }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAssistant = pathname.startsWith("/asistan");

  const navItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "BAL Asistan", href: "/asistan" },
    { name: "Duyurular", href: "/duyurular" },
    { name: "Bağış", href: "/bagis" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    ...(!user ? [{ name: "Üyelik", href: "/auth/signup" }] : []),
    { name: "Cüzdan", href: "/cuzdan" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center ${
        isAssistant
          ? "border-b border-[#dce3ec] bg-[#f7f8fb]/95 shadow-sm backdrop-blur-md"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Image src="/icon.png" alt="BALÖDER" width={40} height={40} className="h-10 w-10 object-contain rounded-full" />
              <span className="whitespace-nowrap text-sm font-bold tracking-tight text-dark-gray sm:text-xl">
                BALÖDER
              </span>
            </Link>
          </div>

          {/* Desktop Items */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${pathname === item.href ? "text-bordeaux" : "text-gray-500 hover:text-bordeaux"
                  }`}
              >
                {item.name}
                {item.name === "Cüzdan" && (
                  <CircleAlert className="text-amber-500" size={12} />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all">
                  <User size={16} />
                </Link>
                <form action={logout}>
                  <button className="p-2 cursor-pointer text-gray-400 hover:text-bordeaux transition-colors">
                    <LogOut size={20} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/signup" className="hidden md:flex text-sm font-medium text-gray-500 hover:text-bordeaux transition-colors">
                  Üyelik
                </Link>
                <Link href="/auth/login" className="hidden md:flex text-sm font-semibold text-white bg-bordeaux px-4 py-2 rounded-xl hover:bg-bordeaux/90 transition-all">
                  Giriş Yap
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-dark-gray p-2 cursor-pointer"
              aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-gray-100 md:hidden"
        >
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-all ${pathname === item.href ? "text-bordeaux font-bold" : "text-gray-600 hover:text-bordeaux"}`}
              >
                {item.name}
              </Link>
            ))}

            <div className="h-px bg-gray-100 my-2" />

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-bordeaux px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Profilim
                </Link>
                <form action={logout}>
                  <button className="w-full text-left text-sm font-medium text-gray-600 hover:text-bordeaux px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                    <LogOut size={16} />
                    Çıkış Yap
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-bordeaux px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Üyelik
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-white bg-bordeaux px-4 py-3 rounded-xl mx-4 text-center mt-2"
                >
                  Giriş Yap
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
