"use client";

import { useState } from "react";
import { completeGoogleProfile } from "@/actions/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  Phone,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle,
  UserCheck,
} from "lucide-react";

export default function CompleteProfileContent({ name, email }: { name: string; email: string }) {
  const [formData, setFormData] = useState({
    tc: "",
    schoolNumber: "",
    graduationYear: "",
    phoneNumber: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });

    const result = await completeGoogleProfile(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // On success the server action redirects — no need to handle here
  };

  return (
    <div className="w-full max-w-xl px-4 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-bordeaux/10 text-bordeaux rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-bordeaux/10">
            <UserCheck size={38} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-dark-gray mb-3 tracking-tight">
            Profilini Tamamla
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Merhaba <span className="font-bold text-dark-gray">{name}</span>! Google hesabınla giriş
            yaptın. Sisteme kaydolmak için aşağıdaki bilgileri doldurman gerekiyor.
          </p>
          <p className="text-xs text-gray-400 mt-2 font-medium">{email}</p>
        </div>

        {/* Error banner */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3"
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TC Kimlik No */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                T.C. Kimlik No
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="tc"
                  value={formData.tc}
                  onChange={handleChange}
                  placeholder="11 haneli"
                  className="w-full py-4 pl-12 pr-4 bg-[#f9f9f9] border border-[#eee] rounded-2xl text-[#2c3e50] font-medium outline-none transition-all focus:border-bordeaux focus:ring-2 focus:ring-bordeaux/10"
                  maxLength={11}
                  required
                />
              </div>
            </div>

            {/* Öğrenci No */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Öğrenci No
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="schoolNumber"
                  value={formData.schoolNumber}
                  onChange={handleChange}
                  placeholder="Okul No"
                  className="w-full py-4 pl-12 pr-4 bg-[#f9f9f9] border border-[#eee] rounded-2xl text-[#2c3e50] font-medium outline-none transition-all focus:border-bordeaux focus:ring-2 focus:ring-bordeaux/10"
                  required
                />
              </div>
            </div>

            {/* Mezuniyet Yılı */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Mezuniyet Yılı
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="Örn: 2026"
                  className="w-full py-4 pl-12 pr-4 bg-[#f9f9f9] border border-[#eee] rounded-2xl text-[#2c3e50] font-medium outline-none transition-all focus:border-bordeaux focus:ring-2 focus:ring-bordeaux/10"
                  required
                />
              </div>
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="05XX XXX XX XX"
                  className="w-full py-4 pl-12 pr-4 bg-[#f9f9f9] border border-[#eee] rounded-2xl text-[#2c3e50] font-medium outline-none transition-all focus:border-bordeaux focus:ring-2 focus:ring-bordeaux/10"
                  required
                />
              </div>
            </div>

            {/* Doğum Tarihi */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Doğum Tarihi
              </label>
              <input
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-4 bg-[#f9f9f9] border border-[#eee] rounded-2xl text-[#2c3e50] font-medium outline-none transition-all focus:border-bordeaux focus:ring-2 focus:ring-bordeaux/10"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-[1.25rem] font-black uppercase tracking-[0.15em] shadow-lg shadow-bordeaux/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Kaydı Tamamla <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div >
  );
}
