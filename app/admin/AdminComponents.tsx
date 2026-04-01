"use client";

import {
  verifyUser,
  approveReceipt,
  rejectReceipt,
  updateIdCardStatus,
  updateUserStatus,
  updateBudget,
  createBudget,
  deleteBudget,
  createAnnouncementAction,
  deleteAnnouncementAction,
} from "@/actions/admin";
import { useState } from "react";
import { Loader2, Check, X, Eye } from "lucide-react";

// ---------------------------------------------------------------------------
// User Approval
// ---------------------------------------------------------------------------

export function UserApprovalButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await verifyUser(userId);
        setLoading(false);
      }}
      disabled={loading}
      className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 transition disabled:opacity-50 flex items-center gap-1 cursor-pointer"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
      Onayla
    </button>
  );
}

// ---------------------------------------------------------------------------
// Receipt Actions
// ---------------------------------------------------------------------------

export function ReceiptActions({ requestId, receiptUrl }: { requestId: string; receiptUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");

  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Miktarı Girin"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-32 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black focus:border-emerald-500 outline-none transition"
        />
        <a
          href={`/api/receipt?url=${encodeURIComponent(receiptUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition"
          title="Dekontu Görüntüle"
        >
          <Eye size={18} />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={async () => {
            if (!amount) {
              alert("Lütfen miktarı giriniz.");
              return;
            }
            setLoading(true);
            await approveReceipt(requestId, parseFloat(amount));
            setLoading(false);
          }}
          disabled={loading}
          className="grow bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          title="Onayla"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          Talebi Onayla
        </button>
        <button
          onClick={async () => {
            if (!confirm("Bu talebi reddetmek istediğinize emin misiniz?")) return;
            setLoading(true);
            await rejectReceipt(requestId);
            setLoading(false);
          }}
          disabled={loading}
          className="p-2.5 bg-red-50 text-red-500 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition disabled:opacity-50 cursor-pointer"
          title="Reddet"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ID Card Order Actions
// ---------------------------------------------------------------------------

export function IdCardOrderActions({
  orderId,
  receiptUrl,
  currentStatus,
}: {
  orderId: string;
  receiptUrl: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-end gap-3 min-w-[140px]">
      <div className="flex items-center gap-2">
        <a
          href={`/api/receipt?url=${encodeURIComponent(receiptUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          title="Dekontu Görüntüle"
        >
          <Eye size={14} /> Dekont
        </a>
      </div>
      <div className="w-full">
        <select
          value={currentStatus}
          disabled={loading}
          onChange={async (e) => {
            setLoading(true);
            await updateIdCardStatus(orderId, e.target.value);
            setLoading(false);
          }}
          className="w-full bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600 p-2 rounded-lg outline-none uppercase tracking-wider cursor-pointer disabled:opacity-50"
        >
          <option value="PENDING">Onay Bekliyor</option>
          <option value="APPROVED">Onaylandı/Basılıyor</option>
          <option value="PRINTED">Hazır/Teslim</option>
          <option value="REJECTED">Reddedildi</option>
        </select>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// User Role Toggles
// ---------------------------------------------------------------------------

export function UserRoleToggles({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async (field: string, currentValue: any) => {
    setLoading(true);
    await updateUserStatus(user.id, { [field]: !currentValue });
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-1 items-end text-xs font-bold text-gray-500">
      <label className="flex items-center gap-2 cursor-pointer">
        {user.memberRequested && !user.isMember && (
          <span className="text-[9px] bg-orange-100 text-orange-600 px-1 py-0.5 rounded-sm uppercase">Talep Var</span>
        )}{" "}
        Dernek Üyesi
        <input
          type="checkbox"
          checked={user.isMember}
          disabled={loading}
          onChange={() => handleToggle("isMember", user.isMember)}
          className="w-3 h-3 accent-emerald-500 cursor-pointer"
        />
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        {user.sandikRequested && !user.isSandikMember && (
          <span className="text-[9px] bg-blue-100 text-blue-600 px-1 py-0.5 rounded-sm uppercase">Talep Var</span>
        )}{" "}
        Sandık Üyesi
        <input
          type="checkbox"
          checked={user.isSandikMember}
          disabled={loading}
          onChange={() => handleToggle("isSandikMember", user.isSandikMember)}
          className="w-3 h-3 accent-emerald-500 cursor-pointer"
        />
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-1">
        Admin
        <input
          type="checkbox"
          checked={user.role === "ADMIN"}
          disabled={loading}
          onChange={async () => {
            setLoading(true);
            await updateUserStatus(user.id, { role: user.role === "ADMIN" ? "USER" : "ADMIN" });
            setLoading(false);
          }}
          className="w-3 h-3 accent-bordeaux cursor-pointer"
        />
      </label>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Budget Editor (edit name, amounts + delete)
// ---------------------------------------------------------------------------

export function BudgetEditor({ budget }: { budget: any }) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState(budget.name);
  const [total, setTotal] = useState(budget.total);
  const [spent, setSpent] = useState(budget.spent);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const inputCls =
    "w-full text-sm font-bold border border-gray-200 p-2 rounded-lg focus:border-indigo-400 outline-none transition";

  return (
    <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm space-y-4 relative">
      {/* Name + Delete button row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <label className="text-[10px] uppercase font-bold text-gray-400">Bütçe Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bütçe adı"
            className={inputCls + " mt-1"}
          />
        </div>
        <button
          onClick={() => setConfirmDelete(true)}
          disabled={deleting}
          className="mt-5 p-2 text-red-400 hover:text-white hover:bg-red-500 border border-red-100 hover:border-red-500 rounded-lg transition disabled:opacity-50 cursor-pointer shrink-0"
          title="Bütçeyi Sil"
        >
          {deleting ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
        </button>
      </div>

      {/* Confirm delete overlay */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-white/95 rounded-xl flex flex-col items-center justify-center gap-3 z-10 p-4">
          <p className="text-sm font-black text-dark-gray text-center">
            Bu bütçeyi silmek istediğinize emin misiniz?
          </p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
            Bu işlem geri alınamaz.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-black rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              İptal
            </button>
            <button
              onClick={async () => {
                setDeleting(true);
                setConfirmDelete(false);
                await deleteBudget(budget.id);
                setDeleting(false);
              }}
              className="px-4 py-2 bg-red-500 text-white text-xs font-black rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              Evet, Sil
            </button>
          </div>
        </div>
      )}

      {/* Amount inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400">Toplanan (₺)</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className={inputCls + " mt-1"}
          />
        </div>
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400">Harcanan (₺)</label>
          <input
            type="number"
            value={spent}
            onChange={(e) => setSpent(Number(e.target.value))}
            className={inputCls + " mt-1"}
          />
        </div>
      </div>

      <button
        className="w-full bg-dark-gray text-white text-[10px] uppercase tracking-widest font-bold p-2 rounded-lg hover:bg-indigo-600 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        disabled={loading}
        onClick={async () => {
          if (!name.trim()) {
            alert("Bütçe adı boş olamaz.");
            return;
          }
          setLoading(true);
          await updateBudget(budget.id, name, total, spent);
          setLoading(false);
        }}
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
        {loading ? "Kaydediliyor..." : "Güncelle"}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Budget Manager (create new budget)
// ---------------------------------------------------------------------------

export function BudgetManager() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [total, setTotal] = useState<string>("");
  const [spent, setSpent] = useState<string>("");

  const inputCls =
    "w-full text-sm font-bold border border-gray-200 p-2 rounded-lg focus:border-indigo-400 outline-none transition";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await createBudget(name, Number(total) || 0, Number(spent) || 0);
    setName("");
    setTotal("");
    setSpent("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-indigo-100 p-5 rounded-xl shadow-sm space-y-4">
      <h4 className="font-black text-dark-gray uppercase text-sm">Yeni Bütçe Ekle</h4>
      <div>
        <label className="text-[10px] uppercase font-bold text-gray-400">Bütçe Adı</label>
        <input
          type="text"
          required
          placeholder="Örn: Sosyal Etkinlikler Fonu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls + " mt-1"}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400">Toplanan (₺)</label>
          <input
            type="number"
            placeholder="0"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className={inputCls + " mt-1"}
          />
        </div>
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400">Harcanan (₺)</label>
          <input
            type="number"
            placeholder="0"
            value={spent}
            onChange={(e) => setSpent(e.target.value)}
            className={inputCls + " mt-1"}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white text-[10px] uppercase tracking-widest font-bold p-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Oluştur
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Announcement Manager
// ---------------------------------------------------------------------------

export function AnnouncementManager() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createAnnouncementAction(title, excerpt, content);
    setTitle("");
    setExcerpt("");
    setContent("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm space-y-3">
      <h4 className="font-black text-dark-gray uppercase text-sm">Yeni Duyuru Ekle</h4>
      <input
        type="text"
        required
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-sm font-bold border p-2 rounded-lg focus:border-bordeaux outline-none"
      />
      <input
        type="text"
        required
        placeholder="Kısa Özet (Ana Sayfa İçin)"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full text-xs border p-2 rounded-lg focus:border-bordeaux outline-none"
      />
      <textarea
        placeholder="Detaylı İçerik"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full text-xs border p-2 rounded-lg focus:border-bordeaux outline-none h-20"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-bordeaux text-white text-[10px] uppercase tracking-widest font-bold p-2 px-4 rounded-lg hover:bg-black transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Yayınla
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Delete Announcement
// ---------------------------------------------------------------------------

export function DeleteAnnouncement({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg disabled:opacity-50 cursor-pointer"
      disabled={loading}
      onClick={async () => {
        if (!confirm("Silmek istediğinize emin misiniz?")) return;
        setLoading(true);
        await deleteAnnouncementAction(id);
        setLoading(false);
      }}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
    </button>
  );
}
