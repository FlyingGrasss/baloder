"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));

    setLoading(false);
    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 bg-[#f4f7f9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-dark-gray mb-6 tracking-tight border-l-8 border-bordeaux pl-8 uppercase">
            İletişim
          </h1>
          <p className="text-xl text-gray-500 font-medium">Bize her zaman ulaşabilirsiniz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100"
            >
              <h3 className="text-3xl font-black text-dark-gray mb-10 tracking-tight">Mesaj Gönderin</h3>

              <AnimatePresence mode="wait">
                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-6 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-[1.5rem] font-bold flex items-center gap-4"
                  >
                    <CheckCircle2 size={24} /> Mesajınız başarıyla iletildi. En kısa sürede size döneceğiz.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Ad Soyad</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ad Soyad"
                      className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-dark-gray font-medium focus:ring-2 ring-bordeaux/10 focus:border-bordeaux outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">E-posta</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ornek@bal.k12.tr"
                      className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-dark-gray font-medium focus:ring-2 ring-bordeaux/10 focus:border-bordeaux outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Konu</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Mesaj Konusu"
                    className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-dark-gray font-medium focus:ring-2 ring-bordeaux/10 focus:border-bordeaux outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Mesajınız</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Nasıl yardımcı olabiliriz?"
                    className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-dark-gray font-medium focus:ring-2 ring-bordeaux/10 focus:border-bordeaux outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-12 py-5 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-[1.5rem] font-black uppercase tracking-widest shadow-2xl shadow-bordeaux/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : <>Mesajı Gönder <Send size={20} /></>}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
              <h4 className="text-xl font-black text-dark-gray mb-8 uppercase tracking-tight">İletişim Bilgileri</h4>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-bordeaux/5 text-bordeaux rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Adres</p>
                    <p className="font-bold text-dark-gray leading-relaxed text-sm">Bornova Anadolu Lisesi <br /> Bornova, İzmir / Türkiye</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-bordeaux/5 text-bordeaux rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">E-posta</p>
                    <p className="font-bold text-dark-gray text-sm">yonetimkurulu@balogrenci.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-gray p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
              <h4 className="text-xl font-bold mb-4 relative z-10">Bizi Takip Edin</h4>
              <p className="text-gray-400 text-sm font-medium mb-6 relative z-10">Sosyal medyadan en güncel gelişmeleri takip edebilirsiniz.</p>
              <div className="flex gap-4 relative z-10">
                <a
                  href="https://www.instagram.com/balogrenci/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-black text-xs hover:bg-white hover:text-dark-gray transition-all cursor-pointer"
                >
                  IG
                </a>
                <a
                  href="https://linktr.ee/baloder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-black text-xs hover:bg-white hover:text-dark-gray transition-all cursor-pointer"
                >
                  LT
                </a>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-bordeaux/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}