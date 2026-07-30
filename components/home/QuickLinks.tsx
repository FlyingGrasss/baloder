"use client";

import { Bell, HandHeart, UserPlus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  {
    title: "Gündemi takip et",
    desc: "Okul ve dernek hakkındaki güncel duyuruları tek yerde gör.",
    icon: Bell,
    href: "/duyurular",
    color: "bg-blue-600",
  },
  {
    title: "Derneğe katıl",
    desc: "Fikrini, zamanını ve emeğini öğrenciler için çalışan ekibe kat.",
    icon: UserPlus,
    href: "/auth/signup",
    color: "bg-bordeaux",
  },
  {
    title: "Bağış & şeffaflık",
    desc: "Desteğin nereye gittiğini bütçe ve işlem kayıtlarıyla takip et.",
    icon: HandHeart,
    href: "/bagis",
    color: "bg-emerald-600",
  },
];

export default function QuickLinks({ user }: { user?: unknown }) {
  const filteredLinks = links.filter(
    (link) => !(user && link.href === "/auth/signup"),
  );

  return (
    <section className="bg-white px-5 py-20 sm:px-6">
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 gap-5 ${
          filteredLinks.length === 2 ? "md:max-w-4xl md:grid-cols-2" : "md:grid-cols-3"
        }`}
      >
        {filteredLinks.map((link, index) => (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            key={link.href}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Link
              className="group block h-full rounded-[1.75rem] border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
              href={link.href}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-13 w-13 items-center justify-center rounded-2xl ${link.color} text-white`}
                >
                  <link.icon aria-hidden="true" size={23} />
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-gray-300 transition group-hover:text-bordeaux"
                  size={21}
                />
              </div>
              <h2 className="mt-8 text-2xl font-black tracking-tight text-dark-gray">
                {link.title}
              </h2>
              <p className="mt-3 font-medium leading-7 text-gray-600">
                {link.desc}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
