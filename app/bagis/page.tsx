"use client";
import { useState } from "react";

export default function Bagis() {
  const [copied, setCopied] = useState(false);
  const iban = "TR71 0006 4000 0013 4082 7693 73";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iban.replace(/\s/g, '')); // Copy without spaces
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 text-center lg:text-left">
      <div className="max-w-4xl mx-auto lg:mx-0 space-y-12">
        <section className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Bağış Yap</h1>
          <p className="text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed">
            Desteğinizle BAL ruhunu geleceğe taşıyoruz.
          </p>
        </section>

        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl text-gray-900 space-y-8">
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#A21A2A]">Banka Bilgilerimiz</h2>
            <div className="h-1 w-20 bg-[#A21A2A]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase">Hesap Sahibi</span>
              <p className="text-xl font-bold">BAL Öğrenci Derneği</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase">Banka</span>
              <p className="text-xl font-bold">İş Bankası</p>
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase">IBAN</span>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono font-bold tracking-wider text-lg overflow-x-auto">
                  {iban}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className={`px-6 py-4 rounded-xl font-bold cursor-pointer transition flex items-center justify-center gap-2 shrink-0 ${
                    copied ? "bg-green-500 text-white" : "bg-[#A21A2A] text-white hover:bg-[#851233]"
                  }`}
                >
                  {copied ? "Kopyalandı!" : "IBAN Kopyala"}
                </button>
              </div>
            </div>
          </div>
          
        <p className="text-sm text-gray-500 italic">
          * Lütfen açıklama kısmına isminizi ve iletişim numaranızı yazmayı unutmayınız.
        </p>
        </div>
      
      


        <section className="space-y-4">
          <h3 className="text-xl font-bold text-white">Neden Bağış Yapmalıyım?</h3>
          <p className="text-white/55 leading-relaxed max-w-2xl">
            Toplanan bağışlar doğrudan öğrenci bursları, okul içi kulüp faaliyetleri 
            ve geleneksel okul etkinliklerinin finansmanı için kullanılmaktadır.
          </p>
        </section>

      </div>

      
    </div>
  );
}
