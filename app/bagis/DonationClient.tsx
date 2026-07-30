"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, History, X, Landmark, Copy, Info, Droplets } from "lucide-react";

type DonationTransaction = {
  id: string;
  date: Date | string;
  amount: number;
  category: string;
  detail: string;
};

type DonationBudget = {
  id: string;
  name: string;
  total: number;
  spent: number;
  transactions: DonationTransaction[];
};

const DECLARED_CASH_BALANCE = 8_000;

export default function DonationClient({
  initialBudgets,
}: {
  initialBudgets: DonationBudget[];
}) {
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
          <p className="max-w-3xl text-xl font-medium leading-8 text-gray-500">
            Desteğin öğrencinin günlük hayatında neye dönüştüğünü ve dernek
            bütçesinin nasıl kullanıldığını açıkça takip edin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black text-dark-gray mb-8 tracking-tight">Bağış neye dönüşür?</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-10 font-medium">
                Bağışlar; temel ihtiyaçlara erişim, öğrenci bursları, okul
                iyileştirme çalışmaları ve sosyal etkinlikler için kaynak
                oluşturur. Toplanan ve harcanan tutarları aşağıdaki bütçe
                kayıtlarında yayımlıyoruz.
              </p>
              <div className="space-y-6">
                {['Temel ihtiyaç desteği', 'Öğrenci Burs Fonu', 'Okul iyileştirme ve sosyal projeler'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-gray-600 font-bold">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-4 rounded-3xl bg-blue-50 p-6 text-blue-950">
                <Droplets className="mt-0.5 shrink-0 text-blue-600" size={25} />
                <p className="text-sm font-semibold leading-6">
                  2026 BAL&apos;26 mezuniyet töreninde 1.000&apos;in üzerinde
                  şişe suyu ücretsiz dağıttık. Desteğiniz, bunun gibi doğrudan
                  öğrenciye ulaşan çalışmaların sürmesini sağlar.
                </p>
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
              Lütfen açıklama kısmına Ad-Soyad ve &quot;Bağış&quot; yazmayı
              unutmayınız.
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

          <article className="grid overflow-hidden rounded-[2.5rem] bg-dark-gray text-white shadow-xl md:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-bordeaux p-8 sm:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">
                Fiziksel kasa
              </p>
              <p className="mt-5 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
                ₺{DECLARED_CASH_BALANCE.toLocaleString("tr-TR")}
              </p>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <h3 className="text-2xl font-black">Nakit mevcudu</h3>
              <p className="mt-3 max-w-2xl font-medium leading-7 text-white/60">
                30 Temmuz 2026 itibarıyla derneğin fiziksel kasasında bulunan
                nakit tutardır. Banka hesabı ve aşağıdaki fon bakiyelerinden
                ayrı gösterilir.
              </p>
            </div>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initialBudgets.map((budget) => (
              <motion.button
                key={budget.id}
                onClick={() => setSelectedBudget(selectedBudget === budget.id ? null : budget.id)}
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
                    style={{ width: `${budget.total > 0 ? Math.min((budget.spent / budget.total) * 100, 100) : 0}%` }}
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
                      {activeBudget.transactions?.map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50/50 transition-colors font-medium">
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
