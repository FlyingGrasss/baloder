"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, History, X, Search, Calendar, Landmark, Copy, Info } from "lucide-react";

export default function DonationClient({ initialBudgets }: { initialBudgets: any[] }) {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeBudget = initialBudgets.find(b => b.id === selectedBudget);

  const copyIban = () => {
    navigator.clipboard.writeText('TR71 0006 4000 0013 4082 7693 73');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="pt-32 pb-24 bg-[#f4f7f9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-dark-gray mb-6 tracking-tight border-l-8 border-bordeaux pl-8 uppercase">
            Bağış ve Şeffaflık
          </h1>
          <p className="text-xl text-gray-500 font-medium">Birlikte daha güçlüyüz. Desteğinizle BAL ruhunu yaşatıyoruz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black text-dark-gray mb-8 tracking-tight">Neden Bağış Yapmalıyım?</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-10 font-medium">
                Her bağış, bir BAL öğrencisinin geleceğine dokunmak demektir. Şeffaf yönetim anlayışımızla her kuruşun nereye harcandığını buradan takip edebilirsiniz.
              </p>
              <div className="space-y-6">
                {['Öğrenci Burs Fonu', 'Okul İyileştirme Projeleri', 'Sosyal Etkinlikler'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-gray-600 font-bold">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-bordeaux text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Landmark size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-widest">Banka Bilgileri</h3>
              </div>

              <div className="space-y-10">
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Hesap Sahibi</p>
                  <p className="text-xl font-bold">Bornova Anadolu Lisesi Öğrenci Derneği</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">IBAN</p>
                  <div className="group relative flex items-center justify-between bg-black/5 p-6 rounded-[1.5rem] border border-gray-100 hover:border-bordeaux/20 transition-all cursor-pointer" onClick={copyIban}>
                    <span className="font-mono text-lg tracking-wider text-white">TR71 0006 4000 0013 4082 7693 73</span>
                    <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white text-white group-hover:text-bordeaux transition-all">
                      {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-medium text-white/60 mt-8">
              <Info size={16} />
              Lütfen açıklama kısmına Ad-Soyad ve "Bağış" yazmayı unutmayınız.
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-10 max-sm:pb-0">
            <div>
              <h2 className="text-4xl font-black text-dark-gray tracking-tight uppercase mb-2">Mali Şeffaflık</h2>
              <p className="text-lg text-gray-500 font-medium">Bağışlarınızı ve harcamalarımızı anlık olarak takip edin.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initialBudgets.map((budget) => (
              <motion.button
                key={budget.id}
                onClick={() => setSelectedBudget(selectedBudget === budget.id ? null : null)}
                className={`text-left p-10 rounded-[2.5rem] border-2 transition-all ${selectedBudget === budget.id ? 'bg-white border-bordeaux shadow-2xl' : 'bg-white border-gray-50 shadow-xl'}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedBudget === budget.id ? 'bg-bordeaux text-white' : 'bg-gray-50 text-gray-400'}`}>
                    <History size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mevcut Bakiye</p>
                    <p className="text-2xl font-black text-dark-gray">₺{(budget.total - budget.spent).toLocaleString()}</p>
                  </div>
                </div>
                <h4 className="text-xl font-black text-dark-gray mb-6">{budget.name}</h4>
                <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-1000"
                    style={{ width: `${(budget.spent / budget.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Harcanan: ₺{budget.spent.toLocaleString()}</span>
                  <span>Toplanan: ₺{budget.total.toLocaleString()}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedBudget && activeBudget && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden mt-12"
              >
                <div className="p-10 border-b border-gray-50 flex justify-between items-center">
                  <h4 className="text-2xl font-black text-dark-gray uppercase tracking-tight">{activeBudget.name} Detayları</h4>
                  <button onClick={() => setSelectedBudget(null)} className="p-2 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
                    <X size={24} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                        <th className="px-10 py-6">Tarih</th>
                        <th className="px-10 py-6">Kategori</th>
                        <th className="px-10 py-6">Detay</th>
                        <th className="px-10 py-6 text-right">Tutar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {activeBudget.transactions?.map((t: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors font-medium">
                          <td className="px-10 py-8 text-gray-400">{new Date(t.date).toLocaleDateString()}</td>
                          <td className="px-10 py-8">
                            <span className="px-3 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-widest rounded-lg">{t.category}</span>
                          </td>
                          <td className="px-10 py-8 text-dark-gray">{t.detail}</td>
                          <td className="px-10 py-8 text-right font-black text-bordeaux text-lg">₺{t.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                      {(!activeBudget.transactions || activeBudget.transactions.length === 0) && (
                        <tr>
                          <td colSpan={4} className="px-10 py-8 text-center text-sm font-bold text-gray-400">Henüz bir işlem kaydı bulunmuyor.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
