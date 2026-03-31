"use client";

import { useState } from "react";
import { UserApprovalButton, ReceiptActions, IdCardOrderActions, UserRoleToggles, BudgetEditor, BudgetManager, AnnouncementManager, DeleteAnnouncement } from "./AdminComponents";

import { Users, ReceiptText, MessageSquare, Download, CheckCircle2, XCircle, Clock, CreditCard, Landmark, Megaphone, AlertTriangle, Search } from "lucide-react";

export default function AdminDashboard({ allUsers, pendingReceipts, messages, pendingIdCardOrders, budgets, announcements }: {
  allUsers: any[],
  pendingReceipts: any[],
  messages: any[],
  pendingIdCardOrders: any[],
  budgets: any[],
  announcements: any[]
}) {
  const [activeTab, setActiveTab] = useState<"users" | "receipts" | "idcards" | "budgets" | "announcements" | "messages">("users");
  const [userSearch, setUserSearch] = useState("");

  const pendingUsersCount = allUsers.filter(u => !u.verified).length;

  const downloadExcel = () => {
    // Basic CSV export for simplicity, usually called "Excel" by users
    const headers = ["Tam Ad", "E-posta", "TC Kimlik No", "Okul No", "Mezuniyet Yılı", "Doğum Tarihi", "Onaylı", "Dernek Üyesi", "Sandık Üyesi"];
    const rows = allUsers.map(u => [
      u.name,
      u.email,
      u.tc || "",
      u.schoolNumber || "",
      u.graduationYear || "",
      u.birthDate ? new Date(u.birthDate).toLocaleDateString() : "",
      u.verified ? "Evet" : "Hayır",
      u.isMember ? "Evet" : "Hayır",
      u.isSandikMember ? "Evet" : "Hayır"
    ]);

    const csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF"
      + [headers, ...rows].map(e => e.map(v => `"${v}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `baloder_kullanici_listesi_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: "users", label: "Kullanıcılar", count: pendingUsersCount, icon: Users, color: "bg-bordeaux", warning: pendingUsersCount > 0 },
    { id: "receipts", label: "Bakiye Talepleri", count: pendingReceipts.length, icon: ReceiptText, color: "bg-emerald-500", warning: pendingReceipts.length > 0 },
    { id: "idcards", label: "Kimlik Kartları", count: pendingIdCardOrders.length, icon: CreditCard, color: "bg-orange-500", warning: pendingIdCardOrders.length > 0 },
    { id: "budgets", label: "Bütçe ve Bağışlar", count: budgets.length, icon: Landmark, color: "bg-indigo-500", warning: false },
    { id: "announcements", label: "Duyurular", count: announcements.length, icon: Megaphone, color: "bg-purple-500", warning: false },
    { id: "messages", label: "İletişim Mesajları", count: messages.length, icon: MessageSquare, color: "bg-blue-500", warning: messages.length > 0 },
  ];

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.schoolNumber && u.schoolNumber.includes(userSearch))
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Sidebar Tabs */}
      <div className="w-full lg:w-64 shrink-0 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${activeTab === tab.id
                ? "bg-white text-dark-gray shadow-md font-black"
                : "bg-transparent text-gray-500 hover:bg-gray-200/50 hover:text-dark-gray font-bold"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activeTab === tab.id ? tab.color + " text-white" : "bg-gray-200 text-gray-400"}`}>
                <tab.icon size={16} />
              </div>
              <span className="text-sm tracking-tight">{tab.label}</span>
            </div>
            {tab.warning && (
              <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 bg-white rounded-[2rem] shadow-xl border border-gray-100 min-h-[600px] w-full overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${tabs.find(t => t.id === activeTab)?.color}`} />
            <h2 className="text-xl font-black text-dark-gray uppercase tracking-tighter">{tabs.find(t => t.id === activeTab)?.label}</h2>
          </div>
          {activeTab === "users" && (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="İsim, E-posta, Öğrenci No..." 
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:border-bordeaux outline-none"
                />
              </div>
              <button
                onClick={downloadExcel}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-dark-gray text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-bordeaux transition shadow-sm cursor-pointer shrink-0"
              >
                <Download size={14} /> Excel
              </button>
            </div>
          )}
        </div>

        <div className="p-0 flex-1 overflow-x-auto">
          {activeTab === "users" && (
            <div className="min-w-[800px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                    <th className="p-4 pl-8">Kullanıcı Bilgileri</th>
                    <th className="p-4">Kimlik / Okul No</th>
                    <th className="p-4 text-center">Durum</th>
                    <th className="p-4 pr-8 text-right">Rol & Üyelik Yönetimi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className={`hover:bg-gray-50/50 transition-colors ${!u.verified ? "bg-orange-50/30" : ""}`}>
                      <td className="p-4 pl-8">
                        <div className="flex items-center gap-3">
                          {!u.verified && <AlertTriangle size={14} className="text-orange-500 shrink-0" />}
                          <div>
                            <p className="text-sm font-black text-dark-gray">{u.name}</p>
                            <p className="text-xs text-gray-500 font-bold">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-xs font-bold text-gray-600">TC: <span className="font-mono">{u.tc || "-"}</span></p>
                        <p className="text-xs font-bold text-gray-600">Öğrenci No: <span className="font-mono">{u.schoolNumber || "-"}</span></p>
                      </td>
                      <td className="p-4 text-center">
                        {!u.verified ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] px-2 py-1 bg-orange-100 text-orange-700 rounded-md font-black uppercase tracking-widest">Onay Bekliyor</span>
                            <UserApprovalButton userId={u.id} />
                          </div>
                        ) : (
                          <span className="text-[9px] px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md font-black uppercase tracking-widest border border-emerald-100">Onaylı</span>
                        )}
                      </td>
                      <td className="p-4 pr-8 text-right">
                        <UserRoleToggles user={u} />
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-sm font-bold text-gray-400">Sonuç bulunamadı.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "receipts" && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingReceipts.map(r => (
                <div key={r.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-black text-dark-gray">{r.user.name}</h3>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{new Date(r.createdAt).toLocaleString("tr-TR")}</p>
                    </div>
                    <ReceiptActions requestId={r.id} receiptUrl={r.receiptUrl} />
                  </div>
                </div>
              ))}
              {pendingReceipts.length === 0 && <EmptyState type="talep" />}
            </div>
          )}

          {activeTab === "idcards" && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingIdCardOrders.map(o => (
                <div key={o.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${o.status === 'PENDING' ? 'bg-orange-500' : o.status === 'APPROVED' ? 'bg-blue-500' : o.status === 'PRINTED' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-black text-dark-gray">{o.name}</h3>
                      <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">{o.studentNo} • {o.department}</p>
                    </div>
                    <IdCardOrderActions orderId={o.id} receiptUrl={o.receiptUrl} currentStatus={o.status} />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Teslimat Notu</p>
                    <p className="text-xs font-bold text-dark-gray">{o.deliveryDetails}</p>
                  </div>
                </div>
              ))}
              {pendingIdCardOrders.length === 0 && <EmptyState type="kart siparişi" />}
            </div>
          )}

          {activeTab === "budgets" && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-1">
                <BudgetManager />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgets.map(b => (
                  <BudgetEditor key={b.id} budget={b} />
                ))}
                {budgets.length === 0 && (
                  <p className="col-span-2 text-xs font-bold text-gray-400 italic">Henüz bütçe bulunmuyor. Soldan yeni bir tane oluşturun.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-1">
                <AnnouncementManager />
              </div>
              <div className="lg:col-span-2 space-y-3">
                {announcements.map((a) => (
                  <div key={a.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-black text-dark-gray">{a.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">{new Date(a.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{a.excerpt}</p>
                    </div>
                    <DeleteAnnouncement id={a.id} />
                  </div>
                ))}
                {announcements.length === 0 && <p className="text-xs font-bold text-gray-400 italic">Duyuru bulunmuyor.</p>}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500" />
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-black text-dark-gray uppercase tracking-tighter">{msg.subject}</h3>
                      <p className="text-[10px] text-gray-400 font-bold mt-1">{msg.name} ({msg.email})</p>
                    </div>
                    <p className="text-[9px] font-black text-gray-400 uppercase">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 font-medium">
                    {msg.message}
                  </div>
                </div>
              ))}
              {messages.length === 0 && <EmptyState type="mesaj" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="col-span-full py-20 text-center space-y-3">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-200">
        <CheckCircle2 size={32} />
      </div>
      <div>
        <h3 className="text-sm font-black text-dark-gray uppercase italic">Her Şey Güncel!</h3>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Bekleyen {type} bulunmuyor.</p>
      </div>
    </div>
  );
}
