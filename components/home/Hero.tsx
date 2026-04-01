"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero({ user }: { user?: any }) {
  return (
    <section className="bg-dark-gray text-white py-24 md:py-32 px-6 rounded-b-[3rem] sm:rounded-b-[4rem] relative overflow-hidden">
      {/* Background stays but we ensure it's truly behind */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://picsum.photos/seed/school/1200/800"
          alt="BAL"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bordeaux/60 to-dark-gray"></div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8"
        >
          BAL Öğrenci Derneği
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight max-w-4xl"
        >
          Geleceği  {" "}
          <span className="text-bordeaux underline decoration-white/20 underline-offset-8">Birlikte</span> {" "}
          İnşa Ediyoruz
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base md:text-xl text-gray-400 mb-12 max-w-xl mx-auto font-medium leading-relaxed"
        >
          BAL ruhunu yaşatmak ve öğrenciler arası dayanışmayı güçlendirmek için çalışıyoruz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {!user && (
            <Link
              href="/auth/signup"
              className="bg-white text-bordeaux px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-white/5 cursor-pointer"
            >
              Aramıza Katıl
            </Link>
          )}
          <Link
            href="/cuzdan"
            className="bg-white/10 backdrop-blur-md text-white border-2 border-white/10 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all cursor-pointer"
          >
            Cüzdanım
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
