"use client";

import { useState } from "react";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Bir hata oluştu.");
      }
      
      router.push("/");
      router.refresh();
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
      setLoading(false);
    }
  };

  if (confirming) {
    return (
      <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3 text-red-700">
          <AlertTriangle size={24} className="shrink-0" />
          <div className="text-left">
            <p className="font-bold text-sm">Emin misiniz?</p>
            <p className="text-xs">BALÖDER profiliniz ve BALÖDER verileriniz silinecek. BAL ID hesabınız ve diğer BAL uygulamaları etkilenmez.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => { setConfirming(false); setError(""); }}
            disabled={loading}
            className="flex-1 sm:flex-none px-4 py-2 bg-white text-gray-500 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-red-700 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Evet, Sil"}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2 w-full text-center sm:hidden">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold uppercase tracking-widest text-[10px] transition-colors p-2 rounded-lg hover:bg-red-50"
    >
      <Trash2 size={14} />
      BALÖDER Verilerimi Sil
    </button>
  );
}
