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

// ---------------------------------------------------------------------------
// Kooperatif — New Market Item Form
// ---------------------------------------------------------------------------

import {
  createMarketItem,
  updateMarketItem,
  deleteMarketItem,
  updateMarketStock,
} from "@/actions/admin";
import { Package, Plus, Minus, Pencil, History } from "lucide-react";

export function NewMarketItemForm() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [initialStock, setInitialStock] = useState("");

  const inputCls =
    "w-full text-sm font-bold border border-gray-200 p-2 rounded-lg focus:border-teal-400 outline-none transition bg-white";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !imageUrl.trim()) return;
    setLoading(true);
    await createMarketItem(
      name,
      imageUrl,
      parseFloat(sellPrice) || 0,
      parseInt(initialStock) || 0,
    );
    setName("");
    setImageUrl("");
    setSellPrice("");
    setInitialStock("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-teal-100 p-5 rounded-xl shadow-sm space-y-4"
    >
      <h4 className="font-black text-dark-gray uppercase text-sm flex items-center gap-2">
        <Package size={16} className="text-teal-500" />
        Yeni Ürün Ekle
      </h4>

      <div>
        <label className="text-[10px] uppercase font-bold text-gray-400">
          Ürün Adı
        </label>
        <input
          type="text"
          required
          placeholder="Örn: Balöder Tişörtü"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls + " mt-1"}
        />
      </div>

      <div>
        <label className="text-[10px] uppercase font-bold text-gray-400">
          Görsel URL
        </label>
        <input
          type="url"
          required
          placeholder="https://..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={inputCls + " mt-1"}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400">
            Satış Fiyatı (₺)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className={inputCls + " mt-1"}
          />
        </div>
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400">
            Başlangıç Stok
          </label>
          <input
            type="number"
            min="0"
            placeholder="0"
            value={initialStock}
            onChange={(e) => setInitialStock(e.target.value)}
            className={inputCls + " mt-1"}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-500 text-white text-[10px] uppercase tracking-widest font-bold p-2.5 rounded-lg hover:bg-teal-600 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
        {loading ? "Kaydediliyor..." : "Ürün Oluştur"}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Kooperatif — Market Item Card
// ---------------------------------------------------------------------------

export function MarketItemCard({ item }: { item: any }) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Edit fields
  const [editName, setEditName] = useState(item.name);
  const [editImageUrl, setEditImageUrl] = useState(item.imageUrl);
  const [editSellPrice, setEditSellPrice] = useState(String(item.sellPrice));

  // Stock controls
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [stockLoading, setStockLoading] = useState(false);

  const effectiveQty = parseInt(qty) || 1;

  const handleStock = async (sign: 1 | -1) => {
    setStockLoading(true);
    await updateMarketStock(item.id, sign * effectiveQty, note || undefined);
    setQty("");
    setNote("");
    setStockLoading(false);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateMarketItem(
      item.id,
      editName,
      editImageUrl,
      parseFloat(editSellPrice) || 0,
    );
    setEditing(false);
    setLoading(false);
  };

  const inputCls =
    "w-full text-sm font-bold border border-gray-200 p-2 rounded-lg focus:border-teal-400 outline-none transition bg-white";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden relative flex flex-col">
      {/* Confirm Delete Overlay */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center gap-3 z-20 p-6">
          <p className="text-sm font-black text-dark-gray text-center">
            Bu ürünü silmek istediğinize emin misiniz?
          </p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
            Stok geçmişi de silinecek.
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
                await deleteMarketItem(item.id);
                setDeleting(false);
              }}
              className="px-4 py-2 bg-red-500 text-white text-xs font-black rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              Evet, Sil
            </button>
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-40 bg-gray-50 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x160/f3f4f6/9ca3af?text=Görsel+Yok";
          }}
        />
        {/* Stock badge */}
        <div
          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
            item.stock > 5
              ? "bg-emerald-500 text-white"
              : item.stock > 0
              ? "bg-orange-400 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {item.stock > 0 ? `${item.stock} Stok` : "Tükendi"}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {editing ? (
          <form onSubmit={handleEdit} className="space-y-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              placeholder="Ürün adı"
              className={inputCls}
            />
            <input
              type="url"
              value={editImageUrl}
              onChange={(e) => setEditImageUrl(e.target.value)}
              required
              placeholder="Görsel URL"
              className={inputCls}
            />
            <input
              type="number"
              value={editSellPrice}
              onChange={(e) => setEditSellPrice(e.target.value)}
              step="0.01"
              placeholder="Satış fiyatı"
              className={inputCls}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-teal-500 text-white text-[10px] uppercase tracking-widest font-black p-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                Kaydet
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-3 py-2 bg-gray-100 text-gray-500 text-[10px] font-black rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                İptal
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-black text-dark-gray leading-tight">
                {item.name}
              </h3>
              <p className="text-xs font-bold text-teal-600 mt-0.5">
                ₺{item.sellPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition cursor-pointer"
                title="Düzenle"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                disabled={deleting}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50 cursor-pointer"
                title="Sil"
              >
                {deleting ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
              </button>
            </div>
          </div>
        )}

        {/* Stock Controls */}
        <div className="border-t border-gray-100 pt-3 space-y-2">
          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
            Stok Güncelle
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              placeholder="Miktar (varsayılan: 1)"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="flex-1 text-sm font-bold border border-gray-200 p-2 rounded-lg focus:border-teal-400 outline-none transition bg-white min-w-0"
            />
          </div>
          <input
            type="text"
            placeholder="Not (isteğe bağlı)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full text-xs font-bold border border-gray-200 p-2 rounded-lg focus:border-teal-400 outline-none transition bg-white"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleStock(-1)}
              disabled={stockLoading}
              className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 text-red-500 border border-red-100 text-[10px] font-black uppercase tracking-widest p-2 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition disabled:opacity-50 cursor-pointer"
            >
              {stockLoading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Minus size={12} />
              )}
              Çıkar
            </button>
            <button
              onClick={() => handleStock(1)}
              disabled={stockLoading}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest p-2 rounded-lg hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50 cursor-pointer"
            >
              {stockLoading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Plus size={12} />
              )}
              Ekle
            </button>
          </div>
        </div>

        {/* Stock History Toggle */}
        <button
          onClick={() => setShowHistory((p) => !p)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-teal-600 transition cursor-pointer pt-1"
        >
          <History size={12} />
          {showHistory ? "Geçmişi Gizle" : `Geçmişi Göster (${item.stockHistory?.length ?? 0})`}
        </button>

        {/* Stock History List */}
        {showHistory && (
          <div className="border-t border-gray-100 pt-3 space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {item.stockHistory?.length === 0 && (
              <p className="text-[10px] text-gray-400 font-bold italic">
                Henüz stok hareketi yok.
              </p>
            )}
            {item.stockHistory?.map((h: any) => (
              <div
                key={h.id}
                className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                  h.delta > 0
                    ? "bg-emerald-50 border border-emerald-100"
                    : "bg-red-50 border border-red-100"
                }`}
              >
                <span
                  className={`font-black shrink-0 ${
                    h.delta > 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {h.delta > 0 ? `+${h.delta}` : h.delta}
                </span>
                <div className="flex-1 min-w-0">
                  {h.note && (
                    <p className="font-bold text-dark-gray truncate">{h.note}</p>
                  )}
                  <p className="text-[10px] text-gray-400 font-bold">
                    {h.user?.name ?? "—"} ·{" "}
                    {new Date(h.createdAt).toLocaleString("tr-TR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Kooperatif — Tab Layout
// ---------------------------------------------------------------------------

export function KooperatifTab({ marketItems }: { marketItems: any[] }) {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-1">
        <NewMarketItemForm />
      </div>
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {marketItems.map((item) => (
          <MarketItemCard key={item.id} item={item} />
        ))}
        {marketItems.length === 0 && (
          <p className="col-span-2 text-xs font-bold text-gray-400 italic py-10 text-center">
            Henüz ürün bulunmuyor. Soldan yeni bir ürün oluşturun.
          </p>
        )}
      </div>
    </div>
  );
}
