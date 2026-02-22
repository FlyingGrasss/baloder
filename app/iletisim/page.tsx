// app/iletisim/page.tsx

"use client";

import { useState } from "react";

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus({ type: "success", msg: "Mesajınız başarıyla gönderildi!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", msg: result.error || "Bir hata oluştu." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Sunucuya bağlanılamadı." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">İletişim</h1>
            <p className="text-lg text-white/55 leading-relaxed">
              Sorularınız, önerileriniz veya iş birliği talepleriniz için formu doldurarak bize ulaşabilirsiniz.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-white font-bold">E-Posta</span>
              <span className="text-white/55">iletisim@balogrenci.org</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold">Konum</span>
              <span className="text-white/55">Bornova Anadolu Lisesi, İzmir</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {status && (
              <div className={`p-4 rounded-lg text-sm font-medium ${
                status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {status.msg}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Ad Soyad</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A21A2A] outline-none transition text-gray-900"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Adınızı giriniz"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A21A2A] outline-none transition text-gray-900"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Konu</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A21A2A] outline-none transition text-gray-900"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Mesaj konusu"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mesajınız</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A21A2A] outline-none transition text-gray-900 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Size nasıl yardımcı olabiliriz?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A21A2A] text-white py-4 cursor-pointer rounded-xl font-black text-lg hover:bg-[#851233] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}