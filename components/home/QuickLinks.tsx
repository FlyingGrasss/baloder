"use client";

import { Bell, UserPlus, Wallet, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  {
    title: "Duyurular",
    desc: "Okul ve dernek hakkındaki en güncel haberleri takip edin.",
    icon: Bell,
    href: "/duyurular",
    color: "bg-blue-500"
  },
  {
    title: "Üyelik Başvurusu",
    desc: "BALÖDER ailesine katılmak için başvurunuzu hemen yapın.",
    icon: UserPlus,
    href: "/auth/signup",
    color: "bg-bordeaux"
  },
  {
    title: "Dijital Cüzdan",
    desc: "Kantin ve diğer harcamalarınızı kolayca yönetin.",
    icon: Wallet,
    href: "/cuzdan",
    color: "bg-emerald-500"
  }
];

export default function QuickLinks() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-12 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      {links.map((link, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + idx * 0.1 }}
        >
          <Link
            href={link.href}
            className="group block bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl hover:shadow-bordeaux/5 border border-gray-100 transition-all hover:-translate-y-2"
          >
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div className={`w-14 h-14 md:w-16 md:h-16 ${link.color} text-white rounded-[1.25rem] flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                <link.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:text-bordeaux transition-colors">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <h3 className="text-2xl font-black text-dark-gray mb-3 tracking-tight group-hover:text-bordeaux transition-colors">{link.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{link.desc}</p>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
