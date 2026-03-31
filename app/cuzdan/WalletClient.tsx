"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Plus,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  Upload,
  FileText,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Landmark,
  Copy,
  ShieldCheck,
  Zap,
  Settings,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { upload } from "@vercel/blob/client";
import { saveDepositRequest, submitIdCardOrder, requestMembership } from "@/actions/wallet";

export default function WalletClient({
  initialBalance,
  initialTransactions,
  pendingRequests,
  dbUser,
  idCardOrders
}: {
  initialBalance: number;
  initialTransactions: any[];
  pendingRequests: any[];
  dbUser: any;
  idCardOrders: any[];
}) {
  // Wallet state
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositFile, setDepositFile] = useState<File | null>(null);
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [depositError, setDepositError] = useState("");
  const depositFileInputRef = useRef<HTMLInputElement>(null);

  // ID Card Order state
  const [showCardOrderModal, setShowCardOrderModal] = useState(false);
  const [cardOrderFile, setCardOrderFile] = useState<File | null>(null);
  const [cardOrderData, setCardOrderData] = useState({
    name: dbUser?.name || "",
    studentNo: dbUser?.schoolNumber || "",
    department: "",
    deliveryDetails: ""
  });
  const [cardOrderLoading, setCardOrderLoading] = useState(false);
  const [cardOrderSuccess, setCardOrderSuccess] = useState(false);
  const [cardOrderError, setCardOrderError] = useState("");
  const cardOrderFileInputRef = useRef<HTMLInputElement>(null);

  // Other UI states
  const [code, setCode] = useState("");
  const [transactionCodeMsg, setTransactionCodeMsg] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  // Compute Account Type based on DB dbUser
  let accountType = "Standart Üyelik";
  if (dbUser?.isSandikMember) accountType = "Sandık Üyesi";
  else if (dbUser?.isMember) accountType = "Dernek Üyesi";

  // Existing Cards List (Merge static with active orders)
  const activeOrders = idCardOrders || [];
  const cardsToDisplay = activeOrders.map(order => ({
    id: order.id,
    last4: "4242", // Mock since it's just ID card, not real credit card
    type: "Fiziksel ID",
    status: order.status === "PENDING" ? "Onay Bekliyor" : (order.status === "APPROVED" ? "Basılıyor" : (order.status === "PRINTED" ? "Hazır/Teslim" : "Reddedildi")),
    expiry: "08/28",
    holder: order.name.toUpperCase()
  }));

  const handleDepositUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositFile) return;

    setDepositLoading(true);
    setDepositError("");

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const uniqueName = `receipt_${timestamp}_${depositFile.name}`;

      const blobDetails = await upload(uniqueName, depositFile, {
        access: 'private',
        handleUploadUrl: '/api/deposit/upload',
      });

      const res = await saveDepositRequest(blobDetails);

      if (res.success) {
        setDepositSuccess(true);
        setDepositFile(null);
        setTimeout(() => {
          setIsDepositOpen(false);
          setDepositSuccess(false);
        }, 3000);
      } else {
        setDepositError(res.error || "Sunucu hatası");
      }
    } catch (err: any) {
      const msg = err.message || "Dosya yüklenirken bir hata oluştu.";
      setDepositError(msg.includes("Content type mismatch") ? "Bu dosya formatı desteklenmiyor." : msg);
    } finally {
      setDepositLoading(false);
    }
  };

  const handleCardOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbUser?.verified) {
      setCardOrderError("Hesabınız henüz onaylanmadı. Sipariş oluşturmak için hesabınızın onaylanmasını bekleyin.");
      return;
    }
    if (!cardOrderFile) {
      setCardOrderError("Lütfen 50 TL ödeme dekontunu yükleyin.");
      return;
    }

    setCardOrderLoading(true);
    setCardOrderError("");

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const uniqueName = `idcard_receipt_${timestamp}_${cardOrderFile.name}`;

      const blobDetails = await upload(uniqueName, cardOrderFile, {
        access: 'private',
        handleUploadUrl: '/api/deposit/upload',
      });

      const res = await submitIdCardOrder(cardOrderData, blobDetails);

      if (res.success) {
        setCardOrderSuccess(true);
        setCardOrderFile(null);
        setTimeout(() => {
          setShowCardOrderModal(false);
          setCardOrderSuccess(false);
        }, 3000);
      } else {
        setCardOrderError(res.error || "Sunucu hatası");
      }
    } catch (err: any) {
      const msg = err.message || "Talebiniz alınırken bir hata oluştu.";
      setCardOrderError(msg);
    } finally {
      setCardOrderLoading(false);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      setTransactionCodeMsg("Geçersiz veya süresi dolmuş işlem kodu.");
      setTimeout(() => setTransactionCodeMsg(""), 3000);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#f4f7f9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">

        {/* Header (Desktop + Info) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black text-dark-gray tracking-tighter border-l-[0.7rem] border-bordeaux pl-6 uppercase italic">
              Cüzdanım
            </h1>
            <p className="text-base text-gray-500 font-medium tracking-tight ml-6">Bakiyenizi ve kartlarınızı yönetin.</p>
          </div>
        </div>

        {/* Account Type & Upgrade */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bordeaux/10 rounded-full flex items-center justify-center text-bordeaux">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Üyelik Tipi</p>
              <p className="font-bold text-dark-gray">{accountType}</p>
            </div>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-dark-gray text-white px-4 py-2 cursor-pointer rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-black transition-colors"
          >
            <Zap size={14} className="text-yellow-400 fill-yellow-400" /> Hesap
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-dark-gray text-white p-6 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-bordeaux/20 rounded-full -mr-16 -mt-16 blur-3xl transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <p className="text-white/60 text-sm font-black uppercase tracking-widest">Mevcut Bakiye</p>
              {dbUser?.isSandikMember && (
                <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-white/20">
                  <Zap size={10} className="text-yellow-400 fill-yellow-400" /> Sandık Aktif
                </div>
              )}
            </div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-2xl font-bold opacity-50 italic">₺</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{initialBalance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</h2>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDepositOpen(true)}
                className="flex-1 bg-white cursor-pointer text-dark-gray py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
              >
                <Plus size={16} /> Bakiye Yükle
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wallet size={150} />
          </div>
        </div>

        {/* Card Management */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-dark-gray uppercase italic tracking-tighter">Kimlik Kartım</h3>
            {!cardsToDisplay.length && (
              <button
                onClick={() => setShowCardOrderModal(true)}
                className="text-bordeaux text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-dark-gray transition-colors"
              >
                <Plus size={14} /> Kart Siparişi
              </button>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {cardsToDisplay.length > 0 ? cardsToDisplay.map((card) => (
              <div
                key={card.id}
                className="min-w-[280px] h-[180px] bg-gradient-to-br from-dark-gray to-black p-6 rounded-[2rem] relative overflow-hidden shadow-xl flex flex-col justify-between shrink-0 border border-white/10"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-10 h-8 bg-yellow-500/20 rounded-lg border border-yellow-500/30"></div>
                  <div className="text-white/40 text-[10px] font-black tracking-widest uppercase bg-white/5 px-2 py-1 rounded-md">
                    BALÖDER ID CARD
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-white/40 text-[8px] uppercase tracking-widest mb-1">Kimlik No / Kart No</p>
                  <p className="text-white text-lg font-mono tracking-widest">**** **** **** {card.last4}</p>
                </div>

                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <p className="text-white/40 text-[8px] uppercase mb-1">Kart Sahibi</p>
                    <p className="text-white text-xs font-bold tracking-wider">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[8px] uppercase mb-1">Durum</p>
                    <p className={`text-xs font-black uppercase ${card.status === 'Reddedildi' ? 'text-red-400' : card.status === 'Onay Bekliyor' ? 'text-orange-400' : 'text-emerald-400'}`}>{card.status}</p>
                  </div>
                </div>
              </div>
            )) : (
              <button
                onClick={() => setShowCardOrderModal(true)}
                className="w-full h-[180px] bg-white border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-gray-400 hover:bg-gray-50 hover:border-bordeaux/50 transition-all shrink-0 group"
              >
                <div className="w-12 h-12 bg-gray-50 group-hover:bg-bordeaux/10 group-hover:text-bordeaux rounded-full flex items-center justify-center transition-colors">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest text-dark-gray">Fiziksel ID Kart Sipariş Et</span>
                <span className="text-[10px] text-gray-500 max-w-[200px] text-center">Tüm kampüs içi ödemelerde kullanabileceğiniz özel kartınız</span>
              </button>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-dark-gray uppercase italic tracking-tighter">İşlem Geçmişi</h3>
          </div>

          <div className="space-y-3">
            {[
              ...pendingRequests.map(p => ({ ...p, isDeposit: true })),
              ...initialTransactions.map(t => ({ ...t, isDeposit: false }))
            ].sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime()).map((t: any) => (
              <div key={t.id} className={`bg-white p-6 rounded-3xl border-2 transition-all hover:translate-x-1 ${t.isDeposit && t.status === 'PENDING' ? 'border-orange-100 shadow-orange-100/30' : t.isDeposit && t.status === 'REJECTED' ? 'border-red-100 shadow-red-100/30' : 'border-gray-50'}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${t.isDeposit ? (t.status === 'PENDING' ? 'bg-orange-50 text-orange-500' : t.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500') :
                      t.total > 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
                      }`}>
                      {t.isDeposit ? (t.status === 'PENDING' ? <Clock size={24} className="animate-pulse" /> : t.status === 'APPROVED' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />) :
                        t.total > 0 ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                    </div>
                    <div>
                      <h4 className="font-black text-dark-gray text-sm md:text-base uppercase tracking-tight line-clamp-1">
                        {t.isDeposit ? 'Bakiye Yükleme Talebi' : (t.items?.join(", ") || "Harcama")}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(t.createdAt || t.date).toLocaleDateString("tr-TR")}</p>
                        {t.isDeposit && <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${t.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : t.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{t.status === 'PENDING' ? 'İncelemede' : t.status === 'APPROVED' ? 'Onaylandı' : 'Reddedildi'}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-lg md:text-xl font-black tracking-tighter ${t.isDeposit ? (t.status === 'REJECTED' ? 'text-gray-400 line-through' : t.status === 'PENDING' ? 'text-orange-500' : 'text-emerald-500') : t.total > 0 ? 'text-emerald-500' : 'text-dark-gray'}`}>
                      {t.isDeposit ? '+' : (t.total > 0 ? '+' : '-')}₺{Math.abs(t.isDeposit ? t.amount : t.total).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {initialTransactions.length === 0 && pendingRequests.length === 0 && (
              <div className="py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 font-bold text-sm">
                Henüz bir işlem kaydı bulunmuyor.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Deposit Modal */}
      <AnimatePresence>
        {isDepositOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !depositLoading && setIsDepositOpen(false)}
              className="absolute inset-0 bg-dark-gray/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="overflow-y-auto p-6 md:p-10 scrollbar-hide">
                <button
                  onClick={() => setIsDepositOpen(false)}
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-bordeaux transition-all z-20 hover:rotate-90 bg-gray-50 rounded-full cursor-pointer"
                  disabled={depositLoading}
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload size={28} />
                  </div>
                  <h2 className="text-2xl font-black text-dark-gray tracking-tight uppercase italic mb-1">Bakiye Yükle</h2>
                  <p className="text-xs text-gray-500 font-bold">Aşağıdaki İBAN'a havale yapıp dekontu yükleyin.</p>
                </div>

                {depositSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 size={40} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-dark-gray uppercase tracking-tighter">İletildi</h3>
                      <p className="text-xs text-gray-500 font-bold mt-1">Talebiniz incelenecektir.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleDepositUpload} className="space-y-6">
                    {depositError && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase flex items-center gap-3 border border-red-100">
                        <AlertCircle size={16} /> {depositError}
                      </div>
                    )}

                    <div className="bg-gray-50 p-5 rounded-2xl space-y-1 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">İBAN (İş Bankası)</p>
                        <Copy size={14} className="text-gray-400 hover:text-dark-gray cursor-pointer" onClick={() => navigator.clipboard.writeText('TR71 0006 4000 0013 4082 7693 73')} />
                      </div>
                      <p className="text-dark-gray font-mono font-bold text-xs tracking-widest break-all">TR71 0006 4000 0013 4082 7693 73</p>
                      <p className="text-[10px] text-gray-500 font-bold pt-2 border-t border-gray-200/50 mt-2">BAL Öğrenci Derneği</p>
                    </div>

                    <div
                      onClick={() => depositFileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group ${depositFile ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-300 hover:border-bordeaux/50 hover:bg-gray-50'}`}
                    >
                      <input
                        type="file"
                        ref={depositFileInputRef}
                        onChange={(e) => setDepositFile(e.target.files?.[0] || null)}
                        className="hidden"
                        accept="image/*,.pdf"
                      />
                      {depositFile ? (
                        <div className="space-y-2">
                          <FileText size={32} className="mx-auto text-emerald-500" />
                          <p className="font-bold text-emerald-700 truncate max-w-[200px] mx-auto text-xs">{depositFile.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-gray-400 group-hover:text-bordeaux transition-colors">
                          <Upload size={32} className="mx-auto" />
                          <p className="font-bold text-xs">Dekont Yüklemek İçin Tıklayın</p>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!depositFile || depositLoading}
                      className="w-full py-4 bg-dark-gray hover:bg-black disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-xs disabled:cursor-not-allowed cursor-pointer"
                    >
                      {depositLoading ? <Loader2 className="animate-spin" size={18} /> : "Talebi Gönder"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ID Card Order Modal */}
      <AnimatePresence>
        {showCardOrderModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !cardOrderLoading && setShowCardOrderModal(false)}
              className="absolute inset-0 bg-dark-gray/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="overflow-y-auto p-6 md:p-10 scrollbar-hide">
                <button
                  onClick={() => setShowCardOrderModal(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-dark-gray bg-gray-50 p-2 rounded-full z-10 cursor-pointer"
                  disabled={cardOrderLoading}
                >
                  <X size={20} />
                </button>

                <h3 className="text-2xl font-black text-dark-gray mb-2 uppercase italic tracking-tighter">Kimlik Kartı Siparişi</h3>
                <p className="text-gray-500 text-xs font-bold mb-6">Öğrenci kimlik kartınızı şimdi talep edin.</p>

                {cardOrderSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 size={40} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-dark-gray uppercase tracking-tighter">Sipariş Alındı</h3>
                      <p className="text-xs text-gray-500 font-bold mt-2 leading-relaxed">Başvurunuz ve dekontunuz başarıyla iletildi.<br />Onay sürecinden sonra kartınız hazırlanacaktır.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCardOrderSubmit} className="space-y-5">

                    {!dbUser?.verified && (
                      <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
                        <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[10px] text-orange-700 font-bold leading-relaxed uppercase tracking-wider">
                          Hesabınız henüz onaylanmamış. Sipariş vermeden önce hesabınızın yönetim tarafından doğrulanması gerekmektedir. İşleminiz hata verebilir.
                        </p>
                      </div>
                    )}

                    {cardOrderError && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase flex flex-col gap-1 border border-red-100">
                        <div className="flex items-center gap-2"><AlertCircle size={14} /> HATA:</div>
                        <span className="leading-relaxed">{cardOrderError}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Ad Soyad</label>
                        <input
                          type="text" required
                          value={cardOrderData.name}
                          onChange={(e) => setCardOrderData({ ...cardOrderData, name: e.target.value })}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-bordeaux"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Öğrenci No</label>
                          <input
                            type="text" required
                            value={cardOrderData.studentNo}
                            onChange={(e) => setCardOrderData({ ...cardOrderData, studentNo: e.target.value })}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-bordeaux font-mono"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Bölüm/Sınıf</label>
                          <input
                            type="text" required placeholder="Örn: 9-A, İngilizce"
                            value={cardOrderData.department}
                            onChange={(e) => setCardOrderData({ ...cardOrderData, department: e.target.value })}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-bordeaux"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Teslimat Notu (Kampüs İçi)</label>
                        <textarea
                          required placeholder="Örn: Hafta içi kütüphanede teslim alabilirim."
                          value={cardOrderData.deliveryDetails}
                          onChange={(e) => setCardOrderData({ ...cardOrderData, deliveryDetails: e.target.value })}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-bordeaux min-h-[80px]"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-5 space-y-4">


                      <div className="bg-gray-50 p-5 rounded-2xl space-y-1 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">İBAN (İş Bankası)</p>
                          <Copy size={14} className="text-gray-400 hover:text-dark-gray cursor-pointer" onClick={() => navigator.clipboard.writeText('TR71 0006 4000 0013 4082 7693 73')} />
                        </div>
                        <p className="text-dark-gray font-mono font-bold text-xs tracking-widest break-all">TR71 0006 4000 0013 4082 7693 73</p>
                        <p className="text-[10px] text-gray-500 font-bold pt-2 border-t border-gray-200/50 mt-2">BAL Öğrenci Derneği</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Ödeme Bilgileri</p>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          <span className="text-xs font-bold text-gray-500">Kart Ücreti</span>
                          <span className="text-base font-black text-bordeaux">50.00 ₺</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-3 leading-relaxed">

                          Yukarıdaki İBAN'a ödeme yaparak dekontu yükleyiniz. <br />
                          <span className="text-bordeaux block mt-1">Not: Fotoğraf çekimi BALÖDER fotoğrafçıları tarafından ayrıca yapılacaktır.</span>
                        </p>
                      </div>

                      <div
                        onClick={() => cardOrderFileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl py-6 px-4 text-center transition-all cursor-pointer group ${cardOrderFile ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-200 hover:border-bordeaux/50 hover:bg-gray-50'}`}
                      >
                        <input
                          type="file" required={!cardOrderFile}
                          ref={cardOrderFileInputRef}
                          onChange={(e) => setCardOrderFile(e.target.files?.[0] || null)}
                          className="hidden"
                          accept="image/*,.pdf"
                        />
                        {cardOrderFile ? (
                          <div className="space-y-1">
                            <FileText size={24} className="mx-auto text-emerald-500" />
                            <p className="font-bold text-emerald-700 truncate max-w-[200px] mx-auto text-[10px]">{cardOrderFile.name}</p>
                          </div>
                        ) : (
                          <div className="space-y-1 text-gray-400 group-hover:text-bordeaux transition-colors">
                            <Upload size={24} className="mx-auto" />
                            <p className="font-bold text-[10px] uppercase tracking-widest">50 ₺ Dekontunu Yükle</p>
                          </div>
                        )}
                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={cardOrderLoading || !cardOrderFile}
                      className="w-full py-4 bg-bordeaux text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {cardOrderLoading ? <Loader2 className="animate-spin" size={16} /> : "Siparişi Tamamla"}
                    </button>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal (Informational Only) */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isRequesting && setShowUpgradeModal(false)}
              className="absolute inset-0 bg-dark-gray/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="overflow-y-auto p-6 md:p-10 scrollbar-hide">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-dark-gray bg-gray-50 p-2 rounded-full cursor-pointer z-10"
                >
                  <X size={20} />
                </button>

                <h3 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">Hesap Detayı</h3>
                <p className="text-gray-500 text-xs font-bold mb-8">Üyelik statünüz yönetim tarafından belirlenmektedir.</p>

                <div className="space-y-4 mb-4">
                  <div className={`p-5 rounded-2xl border-2 transition-all ${accountType === 'Standart Üyelik' ? 'border-bordeaux bg-bordeaux/5' : 'border-gray-100 opacity-50'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm uppercase tracking-wide">Standart Üyelik</span>
                      {accountType === 'Standart Üyelik' && <span className="text-[10px] font-black text-bordeaux uppercase tracking-widest bg-bordeaux/10 px-2 py-1 rounded-md">Aktif</span>}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Temel cüzdan özellikleri ve ID kart kullanımı.</p>
                  </div>

                  <div className={`p-5 rounded-2xl border-2 transition-all ${accountType === 'Dernek Üyesi' ? 'border-bordeaux bg-bordeaux/5' : 'border-gray-100'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">Dernek Üyesi <Zap size={14} className="text-yellow-500 fill-yellow-500" /></span>
                      {accountType === 'Dernek Üyesi' && <span className="text-[10px] font-black text-bordeaux uppercase tracking-widest bg-bordeaux/10 px-2 py-1 rounded-md">Aktif</span>}
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-3">Tüm harcamalarda nakit iade (Cashback) avantajı.</p>

                    {(!dbUser?.isMember && !dbUser?.memberRequested) && (
                      <button
                        onClick={async () => {
                          setIsRequesting(true);
                          await requestMembership('member');
                          setIsRequesting(false);
                        }}
                        disabled={isRequesting}
                        className="w-full py-2 bg-bordeaux text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-black transition-colors cursor-pointer"
                      >
                        {isRequesting ? <Loader2 size={14} className="animate-spin mx-auto" /> : "Üyelik Talep Et"}
                      </button>
                    )}
                    {(!dbUser?.isMember && dbUser?.memberRequested) && (
                      <div className="w-full py-2 bg-orange-50 text-orange-600 border border-orange-100 rounded-lg text-xs font-black uppercase tracking-widest text-center cursor-not-allowed">
                        Talep İletildi
                      </div>
                    )}
                  </div>

                  <div className={`p-5 rounded-2xl border-2 transition-all ${accountType === 'Sandık Üyesi' ? 'border-bordeaux bg-bordeaux/5' : 'border-gray-100'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">Sandık Üyesi <ShieldCheck size={14} className="text-blue-500" /></span>
                      {accountType === 'Sandık Üyesi' && <span className="text-[10px] font-black text-bordeaux uppercase tracking-widest bg-bordeaux/10 px-2 py-1 rounded-md">Aktif</span>}
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-3">Nakit iade + "Harcadıkça Öde" limiti (Belirlenen tutara kadar).</p>

                    {(!dbUser?.isSandikMember && !dbUser?.sandikRequested) && (
                      <button
                        onClick={async () => {
                          setIsRequesting(true);
                          await requestMembership('sandik');
                          setIsRequesting(false);
                        }}
                        disabled={isRequesting}
                        className="w-full py-2 bg-bordeaux text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-black transition-colors cursor-pointer"
                      >
                        {isRequesting ? <Loader2 size={14} className="animate-spin mx-auto" /> : "Üyelik Talep Et"}
                      </button>
                    )}
                    {(!dbUser?.isSandikMember && dbUser?.sandikRequested) && (
                      <div className="w-full py-2 bg-orange-50 text-orange-600 border border-orange-100 rounded-lg text-xs font-black uppercase tracking-widest text-center cursor-not-allowed">
                        Talep İletildi
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
