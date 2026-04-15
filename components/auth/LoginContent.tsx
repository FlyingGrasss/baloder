"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { login, forgotPassword, signInWithGoogle } from "@/actions/auth";
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
  const [googleLoading, setGoogleLoading] = useState(false);
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
    <div className="w-full max-w-xl px-4 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 text-white font-bold text-4xl mx-auto mb-6 shadow-lg shadow-bordeaux/20 rounded-[2rem] overflow-hidden">
            <img src="/icon.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-dark-gray mb-3 tracking-tight">
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

        {/* Google Sign-In Button */}
        {!isForgotMode && (
          <div className="space-y-6">
            <button
              type="button"
              disabled={googleLoading || loading}
              onClick={async () => {
                setGoogleLoading(true);
                await signInWithGoogle();
                setGoogleLoading(false);
              }}
              className="w-full py-4 flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-dark-gray font-bold rounded-2xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {googleLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
                  <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
                  <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04"/>
                  <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.0051 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
                </svg>
              )}
              Google ile Giriş Yap
            </button>

            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">veya</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>
        )}

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
                  className="text-[10px] font-black text-bordeaux uppercase tracking-widest hover:underline cursor-pointer"
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
            className="w-full py-5 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-[1.25rem] font-black uppercase tracking-[0.15em] shadow-lg shadow-bordeaux/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
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
              className="text-xs font-bold text-gray-400 hover:text-bordeaux uppercase tracking-widest transition-colors cursor-pointer"
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
