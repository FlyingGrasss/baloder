"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { signup, resendOtp, verifyOtp } from "@/actions/auth";
import { isPasswordValid } from "@/lib/passwordValidation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Phone, Calendar, Hash, ArrowRight, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";

function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tc: "",
    schoolNumber: "",
    graduationYear: "",
    phoneNumber: "",
    birthDate: "",
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });

    const result = await signup(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setStep("otp");
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("email", formData.email);
    data.append("code", otp);
    data.append("callbackUrl", callbackUrl);

    const result = await verifyOtp(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const result = await resendOtp(formData.email, "signup");
    if (result.error) {
      setError(result.error);
    } else {
      setMessage(result.success!);
    }
    setLoading(false);
  };

  if (step === "otp") {
    return (
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-100 text-center"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/10">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-dark-gray mb-3 tracking-tight">Doğrulama Gerekli</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            <span className="font-bold text-dark-gray">{formData.email}</span> adresine gönderilen 8 haneli kodu giriniz.
          </p>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3">
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}
            {message && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-sm font-bold flex items-center gap-3">
                <CheckCircle2 size={18} /> {message}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={8}
              placeholder="00000000"
              className="w-full p-5 bg-gray-50 border border-gray-200 rounded-2xl text-center text-2xl md:text-3xl font-black tracking-[0.2em] md:tracking-[0.4em] focus:ring-2 ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-200"
              required
            />
            <button
              type="submit"
              disabled={loading || otp.length !== 8}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[1.25rem] font-black uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Kodu Doğrula"}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-50 pt-8">
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="text-xs font-bold text-gray-400 hover:text-bordeaux uppercase tracking-widest transition-colors"
            >
              Kod gelmedi mi? Tekrar Gönder
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-dark-gray mb-3 tracking-tight">Hesap Oluşturun</h1>
          <p className="text-gray-500 font-medium">BAL Öğrenci Derneği dijital ekosistemine katılın.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ad Soyad</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Ad Soyad" className="signup-input" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ornek@bal.k12.tr" className="signup-input" required />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="signup-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                {[
                  { key: 'length', label: 'En az 8 karakter' },
                  { key: 'uppercase', label: 'Büyük harf' },
                  { key: 'lowercase', label: 'Küçük harf' },
                  { key: 'number', label: 'Rakam' },
                  { key: 'special', label: 'Özel karakter' },
                ].map((req) => {
                  // Basic client-side check for UI feedback
                  const isValid = req.key === 'length' ? formData.password.length >= 8 :
                    req.key === 'uppercase' ? /[A-Z]/.test(formData.password) :
                      req.key === 'lowercase' ? /[a-z]/.test(formData.password) :
                        req.key === 'number' ? /[0-9]/.test(formData.password) :
                          req.key === 'special' ? /[*_?\/!@#$%^&()+=.\-]/.test(formData.password) : false;

                  return (
                    <div key={req.key} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${isValid ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <CheckCircle2 size={10} strokeWidth={4} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isValid ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {req.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">T.C. Kimlik No</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="tc" value={formData.tc} onChange={handleChange} placeholder="11 haneli" className="signup-input" maxLength={11} required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Öğrenci No</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="schoolNumber" value={formData.schoolNumber} onChange={handleChange} placeholder="Okul No" className="signup-input" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mezuniyet Yılı</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} placeholder="Örn: 2026" className="signup-input" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="05XX XXX XX XX" className="signup-input" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Doğum Tarihi</label>
              <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} className="w-full p-4 bg-[#f9f9f9] border border-[#eee] rounded-2xl text-[#2c3e50] font-medium outline-none transition-all focus:border-[#a21a2a] focus:ring-2 focus:ring-[#a21a2a]/10" required />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordValid(formData.password)}
            className="w-full py-5 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-[1.25rem] font-black uppercase tracking-[0.15em] shadow-lg shadow-bordeaux/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Kaydı Tamamla <ArrowRight size={20} /></>}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Zaten hesabınız var mı?{" "}
            <Link href={`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-bordeaux font-bold hover:underline">
              Giriş Yapın
            </Link>
          </p>
        </div>
      </motion.div>

      <style jsx>{`
        .signup-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: #f9f9f9;
          border: 1px solid #eee;
          border-radius: 1rem;
          color: #2c3e50;
          outline: none;
          transition: all 0.2s;
          font-weight: 500;
        }
        .signup-input:focus {
          ring: 2px;
          ring-color: rgba(162, 26, 42, 0.1);
          border-color: #a21a2a;
        }
      `}</style>
    </div>
  );
}

export default function SignupContent() {
  return (
    <Suspense fallback={<div className="animate-spin w-12 h-12 border-4 border-bordeaux border-t-transparent rounded-full"></div>}>
      <SignupForm />
    </Suspense>
  );
}
