"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User, LogOut, Menu, CircleAlert } from "lucide-react";
import { logout } from "@/actions/logout";

export default function NavbarClient({ user }: { user: unknown }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isAssistant = pathname.startsWith("/asistan");
  const isHome = pathname === "/";
  const isDarkNav = isHome;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 48 || scrollDelta < -6) {
        setIsVisible(true);
      } else if (currentScrollY > 112 && scrollDelta > 6) {
        setIsVisible(false);
        setIsOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "BAL Asistan", href: "/asistan" },
    { name: "Duyurular", href: "/duyurular" },
    { name: "Bağış", href: "/bagis" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Cüzdan", href: "/cuzdan" },
    { name: "İletişim", href: "/iletisim" },
  ];

  const surfaceClass = isAssistant
    ? "border-b border-[#dce3ec] bg-[#f7f8fb]/95 shadow-sm backdrop-blur-md"
    : isDarkNav
      ? "border-b border-white/10 bg-[#171717]/90 shadow-2xl shadow-black/20 backdrop-blur-xl"
      : "border-b border-gray-100 bg-white/95 shadow-md backdrop-blur-xl";
  const navItemClass = isDarkNav
    ? "text-white/60 hover:text-white"
    : "text-gray-500 hover:text-bordeaux";
  const mobileItemClass = isDarkNav
    ? "text-white/70 hover:bg-white/10 hover:text-white"
    : "text-gray-600 hover:bg-gray-50 hover:text-bordeaux";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${surfaceClass}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex cursor-pointer items-center gap-2">
            <Image
              src="/icon.png"
              alt="BALÖDER"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className={`whitespace-nowrap text-sm font-bold tracking-tight sm:text-xl ${isDarkNav ? "text-white" : "text-dark-gray"}`}>
              BALÖDER
            </span>
          </Link>

          <div className="hidden items-center space-x-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname === item.href ? "text-[#ff6b79]" : navItemClass}`}
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
                <Link
                  href="/profile"
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${isDarkNav ? "bg-white/10 text-white/70 hover:bg-white/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                >
                  <User size={16} />
                </Link>
                <form action={logout}>
                  <button
                    className={`cursor-pointer p-2 transition-colors ${isDarkNav ? "text-white/55 hover:text-white" : "text-gray-400 hover:text-bordeaux"}`}
                  >
                    <LogOut size={20} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signup"
                  className={`hidden text-sm font-medium transition-colors lg:flex ${navItemClass}`}
                >
                  Üyelik
                </Link>
                <Link
                  href="/auth/login"
                  className={`hidden rounded-xl px-4 py-2 text-sm font-semibold transition-all lg:flex ${isDarkNav ? "bg-white text-dark-gray hover:bg-gray-100" : "bg-bordeaux text-white hover:bg-bordeaux/90"}`}
                >
                  Giriş Yap
                </Link>
              </div>
            )}

            <button
              onClick={() => {
                setIsVisible(true);
                setIsOpen((open) => !open);
              }}
              className={`cursor-pointer p-2 lg:hidden ${isDarkNav ? "text-white" : "text-dark-gray"}`}
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
          className={`absolute top-16 left-0 right-0 border-t shadow-xl lg:hidden ${isDarkNav ? "border-white/10 bg-[#171717] text-white" : "border-gray-100 bg-white"}`}
        >
          <div className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${pathname === item.href ? "font-bold text-[#ff6b79]" : mobileItemClass}`}
              >
                {item.name}
              </Link>
            ))}

            <div className={`my-2 h-px ${isDarkNav ? "bg-white/10" : "bg-gray-100"}`} />

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${mobileItemClass}`}
                >
                  Profilim
                </Link>
                <form action={logout}>
                  <button
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-left text-sm font-medium transition-all ${mobileItemClass}`}
                  >
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
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${mobileItemClass}`}
                >
                  Üyelik
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="mx-4 mt-2 rounded-xl bg-bordeaux px-4 py-3 text-center text-sm font-semibold text-white"
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
