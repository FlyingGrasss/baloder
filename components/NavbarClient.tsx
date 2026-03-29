"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogOut, LogIn, Menu, X, CircleAlert } from "lucide-react";
import { logout } from "@/actions/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarClient({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Duyurular", href: "/duyurular" },
    { name: "Bağış", href: "/bagis" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    ...(!user ? [{ name: "Üyelik", href: "/auth/signup" }] : []),
    { name: "Cüzdan", href: "/cuzdan" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <img src="/icon.png" alt="BALÖDER" className="w-10 h-10 object-contain rounded-full" />
              <span className="font-bold text-xl tracking-tight text-dark-gray hidden sm:inline uppercase">
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
              className="md:hidden text-dark-gray p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-gray-100 md:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-bordeaux px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
