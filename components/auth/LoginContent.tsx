"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { login, forgotPassword } from "@/actions/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const data = new FormData();
    data.append("email", email);

    if (isForgotMode) {
      const result = await forgotPassword(data);
      if (result?.error) {
        setError(result.error);
      } else {
        setMessage("Şifre sıfırlama talimatları e-posta adresinize gönderildi.");
      }
      setLoading(false);
    } else {
      data.append("password", password);
      data.append("callbackUrl", callbackUrl);

      const result = await login(data);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 text-white font-bold text-4xl mx-auto mb-6 shadow-lg shadow-bordeaux/20 rounded-[2rem] overflow-hidden">
            <img src="/icon.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-dark-gray mb-3 tracking-tight">
            {isForgotMode ? "Şifremi Unuttum" : "BALID'e Giriş Yapın"}
          </h1>
          <p className="text-gray-500 font-medium">
            {isForgotMode ? "E-posta adresinizi girin" : "Bornova Anadolu Lisesi dijital dünyasına hoş geldiniz."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3"
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-sm font-bold flex items-center gap-3"
            >
              <CheckCircle2 size={18} /> {message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@bal.k12.tr"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-dark-gray focus:ring-2 ring-bordeaux/10 focus:border-bordeaux outline-none transition-all font-medium"
                required
              />
            </div>
          </div>

          {!isForgotMode && (
            <div className="space-y-2">
              <div className="flex justify-between items-end ml-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Şifre</label>
                <button
                  type="button"
                  onClick={() => setIsForgotMode(true)}
                  className="text-[10px] font-black text-bordeaux uppercase tracking-widest hover:underline"
                >
                  Şifremi Unuttum
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-dark-gray focus:ring-2 ring-bordeaux/10 focus:border-bordeaux outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-[1.25rem] font-black uppercase tracking-[0.15em] shadow-lg shadow-bordeaux/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isForgotMode ? "Sıfırlama Kodu Gönder" : "Giriş Yap"}
                {!isForgotMode && <ArrowRight size={20} />}
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          {isForgotMode ? (
            <button
              onClick={() => setIsForgotMode(false)}
              className="text-xs font-bold text-gray-400 hover:text-bordeaux uppercase tracking-widest transition-colors"
            >
              Giriş Ekranına Dön
            </button>
          ) : (
            <p className="text-gray-500 text-sm font-medium">
              Hesabınız yok mu?{" "}
              <Link
                href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="text-bordeaux font-bold hover:underline"
              >
                Hemen Kayıt Olun
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginContent() {
  return (
    <Suspense fallback={
      <div className="animate-spin w-12 h-12 border-4 border-bordeaux border-t-transparent rounded-full"></div>
    }>
      <LoginForm />
    </Suspense>
  );
}
