"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import Link from "next/link";

export default function Hero({ user }: { user?: unknown }) {
  return (
    <section className="relative overflow-hidden bg-dark-gray px-5 pb-20 pt-28 text-white sm:px-6 sm:pb-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(162,26,42,0.38),transparent_30%),linear-gradient(120deg,transparent_45%,rgba(255,255,255,0.025)_45%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-44 h-72 w-72 rounded-full border border-white/5"
      />
      <div
        aria-hidden="true"
        className="absolute -left-10 top-58 h-40 w-40 rounded-full border border-white/5"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/80"
            initial={{ opacity: 0, y: 12 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#19e13b]" />
            Bornova Anadolu Lisesi Öğrenci Derneği
          </motion.div>

          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.08, duration: 0.65 }}
          >
            Öğrencinin günlük hayatını{" "}
            <span className="text-[#ff6b79]">daha iyi</span> hâle getiriyoruz.
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl text-base font-medium leading-8 text-white/65 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.16, duration: 0.6 }}
          >
            Pahalı bir şişe sudan duyulmayan bir sınıf sorununa kadar,
            çözülebilecek meselelerin öğrencinin omzunda kalmaması için
            çalışıyoruz.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.24, duration: 0.55 }}
          >
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-dark-gray transition hover:-translate-y-0.5 hover:bg-gray-100"
              href="#yaptiklarimiz"
            >
              Neler yaptık?
              <ArrowDownRight aria-hidden="true" size={18} />
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-black text-white transition hover:bg-white/10"
              href="/hakkimizda"
            >
              Bizi tanı
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            {user ? (
              <Link
                className="inline-flex items-center justify-center gap-2 px-4 py-4 text-sm font-bold text-white/65 transition hover:text-white"
                href="/cuzdan"
              >
                <Wallet aria-hidden="true" size={17} />
                Cüzdanım
              </Link>
            ) : null}
          </motion.div>

          <motion.dl
            animate={{ opacity: 1 }}
            className="mt-14 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-7"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.36, duration: 0.7 }}
          >
            <div>
              <dt className="text-2xl font-black sm:text-3xl">1000+</dt>
              <dd className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                ücretsiz su
              </dd>
            </div>
            <div>
              <dt className="text-2xl font-black sm:text-3xl">5 TL</dt>
              <dd className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                kooperatifte su
              </dd>
            </div>
            <div>
              <dt className="text-lg font-black leading-6 sm:text-xl">
                Kâr amacı yok
              </dt>
              <dd className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                tek taraf öğrenci
              </dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="relative mx-auto w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
          transition={{ delay: 0.18, duration: 0.75, ease: "easeOut" }}
        >
          <div className="relative min-h-[490px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#222] p-7 shadow-2xl sm:p-9">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px]"
            />
            <div className="relative flex h-full min-h-[420px] flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                    BALÖDER
                  </p>
                  <p className="mt-2 max-w-[14rem] text-sm font-bold leading-5 text-white/65">
                    Öğrenciler tarafından, öğrenciler için.
                  </p>
                </div>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[9px] font-black tracking-[0.18em] text-white/50">
                  2026
                </span>
              </div>

              <div aria-hidden="true" className="my-10 select-none">
                <span className="block text-[8.5rem] font-black leading-[0.68] tracking-[-0.1em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.16)] sm:text-[10rem]">
                  BAL
                </span>
              </div>

              <div className="relative -mx-9 -mb-9 bg-bordeaux p-8 sm:p-9">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">
                  Tarafımız belli
                </p>
                <p className="mt-3 text-4xl font-black leading-[0.9] tracking-[-0.04em] sm:text-5xl">
                  <span className="block">ÖĞRENCİ</span>
                  <span className="mt-2 block">DERNEĞİ.</span>
                </p>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-4 -z-10 h-full w-full rounded-[2.25rem] border border-white/10"
          />
        </motion.div>
      </div>
    </section>
  );
}
