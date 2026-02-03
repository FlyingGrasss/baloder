import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";

  // Server Action to handle password verification
  async function handleLogin(formData: FormData) {
    "use server";
    const password = formData.get("password");
    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_auth", "true", { 
        httpOnly: true, 
        secure: true, 
        sameSite: "strict",
        maxAge: 60 * 60 * 24 // 24 hours
      });
      redirect("/admin");
    }
  }

  // Server Action to logout
  async function handleLogout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("admin_auth");
    redirect("/admin");
  }

  // 1. Login View
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-32">
        <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-gray-900 uppercase">Yönetici Girişi</h1>
            <p className="text-gray-500 text-sm">Devam etmek için şifreyi giriniz.</p>
          </div>
          <form action={handleLogin} className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A21A2A] outline-none transition text-gray-900"
            />
            <button
              type="submit"
              className="w-full bg-[#A21A2A] text-white py-3 rounded-xl font-bold hover:bg-[#851233] transition"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Messages View (Authenticated)
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gelen Mesajlar</h1>
          <p className="text-[#A21A2A] font-bold">BALÖDER Yönetim Paneli</p>
        </div>
        <form action={handleLogout}>
          <button className="text-white/50 hover:text-white text-sm font-medium transition border border-white/20 px-4 py-2 rounded-lg">
            Çıkış Yap
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-[#A21A2A]">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{msg.name}</h2>
                <p className="text-sm text-gray-500">{msg.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tarih</p>
                <p className="text-sm text-gray-700">
                  {new Date(msg.createdAt).toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs font-black text-[#A21A2A] uppercase tracking-tighter">Konu: {msg.subject}</p>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>

          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
            <p className="text-white/30 text-xl font-medium">Henüz mesaj bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
}