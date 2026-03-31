"use client";

import { motion } from "framer-motion";

const BOARD_MEMBERS = [
  { name: 'Aegean Tanrıverdi', title: 'Başkan', image: 'https://picsum.photos/seed/aegean/400/400' },
  { name: 'Zeynep Yılmaz', title: 'Başkan Yardımcısı', image: 'https://picsum.photos/seed/zeynep/400/400' },
  { name: 'Can Demir', title: 'Genel Sekreter', image: 'https://picsum.photos/seed/can/400/400' },
  { name: 'Elif Kaya', title: 'Sayman', image: 'https://picsum.photos/seed/elif/400/400' },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#f4f7f9]">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {/* Mission Section */}
        <section className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-bordeaux/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-black text-dark-gray mb-8 tracking-tight border-l-8 border-bordeaux pl-8">
              Misyon ve Değerlerimiz
            </h1>
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 max-w-5xl">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10 font-medium">
                BAL Öğrenci Derneği (BALÖDER), Bornova Anadolu Lisesi öğrencilerinin sosyal, kültürel ve akademik gelişimlerini desteklemek, haklarını savunmak ve okul içindeki dayanışmayı güçlendirmek amacıyla kurulmuştur.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-bordeaux uppercase tracking-[0.2em]">Vizyonumuz</h4>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed uppercase">Dijitalleşen dünyada öğrenci birliğini en modern araçlarla sağlamak ve BAL ruhunu gelecek nesillere taşımak.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-bordeaux uppercase tracking-[0.2em]">Değerlerimiz</h4>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed uppercase">Şeffaflık, katılımcılık, yenilikçilik ve sarsılmaz bir okul aidiyeti.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}