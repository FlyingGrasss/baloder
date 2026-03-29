import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm shadow-xl border border-gray-100">
          <UserIcon size={40} className="text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl font-black text-dark-gray mb-2 uppercase">Giriş Gerekli</h1>
          <p className="text-sm text-gray-500 font-medium mb-6">Lütfen önce giriş yapın.</p>
          <Link href="/auth/login" className="block w-full py-3 bg-bordeaux text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-bordeaux/90 transition-all shadow-lg">
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  const [dbUser, depositRequests] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.depositRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const meta = user.user_metadata || {};
  const profileData = {
    name: dbUser?.name || meta.name || user.email,
    email: dbUser?.email || user.email,
    tc: dbUser?.tc || meta.tc || '-',
    phoneNumber: dbUser?.phoneNumber || meta.phone_number || '-',
    birthDate: dbUser?.birthDate || (meta.birth_date ? new Date(meta.birth_date) : null),
    schoolNumber: dbUser?.schoolNumber || meta.school_number || '-',
    graduationYear: dbUser?.graduationYear || meta.graduation_year || '-',
    role: dbUser?.role || 'USER',
    balance: dbUser?.balance || 0,
    isSandikMember: dbUser?.isSandikMember || meta.is_sandik_member || false
  };

  return (
    <main className="min-h-screen bg-[#f8fafb] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Section - Scaled Down */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-110" />

          <div className="relative z-10 shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-dark-gray text-white rounded-[1.5rem] flex items-center justify-center text-3xl md:text-4xl font-black italic shadow-xl">
              {profileData.name?.charAt(0)}
            </div>
          </div>

          <div className="relative z-10 flex-grow text-center md:text-left space-y-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-dark-gray tracking-tighter uppercase italic leading-tight">{profileData.name}</h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1 flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck size={12} className="text-emerald-500" />
                {profileData.role === "ADMIN" ? "Admin" : "Kullanıcı"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">Aktif Profıl</span>
              </div>
              {profileData.isSandikMember && (
                <div className="bg-bordeaux/5 text-bordeaux px-4 py-1.5 rounded-xl border border-bordeaux/10 flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest italic font-serif">BAL-Sandık</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 bg-gray-50 p-6 md:p-8 rounded-[2rem] border border-gray-100 text-center md:text-right min-w-[150px]">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Cüzdan Bakiyesi</p>
            <p className="text-3xl font-black text-dark-gray tracking-tighter">₺{profileData.balance?.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-dark-gray p-8 rounded-[2.5rem] shadow-xl text-white space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-3 italic">Kişisel</h3>
              <div className="space-y-4">
                <InfoRow icon={<Mail size={16} />} label="E-POSTA" value={profileData.email || ""} />
                <InfoRow icon={<Phone size={16} />} label="TELEFON" value={profileData.phoneNumber || ""} />
                <InfoRow icon={<CreditCard size={16} />} label="TC KİMLİK" value={profileData.tc !== '-' ? `*******${profileData.tc.toString().slice(-4)}` : '-'} />
                <InfoRow icon={<Calendar size={16} />} label="DOĞUM" value={profileData.birthDate ? new Date(profileData.birthDate).toLocaleDateString() : '-'} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 space-y-6">
              <h3 className="text-sm font-black text-dark-gray uppercase tracking-widest border-b border-gray-50 pb-3 italic">Okul</h3>
              <div className="space-y-4">
                <InfoRow icon={<ShieldCheck className="text-bordeaux" size={16} />} label="OKUL NO" value={profileData.schoolNumber?.toString()} dark />
                <InfoRow icon={<GraduationCap className="text-bordeaux" size={16} />} label="MEZUNİYET" value={profileData.graduationYear?.toString()} dark />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white shadow-md rounded-xl flex items-center justify-center text-dark-gray">
                  <Clock size={16} />
                </div>
                <h3 className="text-xl font-black text-dark-gray uppercase italic tracking-tighter">Talepler</h3>
              </div>
              <Link href="/cuzdan" className="text-[9px] font-black text-bordeaux uppercase hover:underline tracking-widest">
                Cüzdan →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {depositRequests.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-100 flex items-center justify-between group hover:border-bordeaux/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-500' :
                      req.status === 'REJECTED' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                      }`}>
                      {req.status === 'APPROVED' ? <ShieldCheck size={20} /> :
                        req.status === 'REJECTED' ? <AlertCircle size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-dark-gray uppercase">Yükleme</p>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.1em]">{new Date(req.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-black tracking-tighter ${req.status === 'APPROVED' ? 'text-emerald-500' :
                      req.status === 'REJECTED' ? 'text-red-500' : 'text-orange-500'
                      }`}>
                      ₺{req.amount.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40">
                      {req.status === 'PENDING' ? 'BEKLEMEDE' : req.status === 'APPROVED' ? 'ONAYLANDI' : 'REDDEDİLDİ'}
                    </p>
                  </div>
                </div>
              ))}
              {depositRequests.length === 0 && (
                <div className="py-12 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-50 text-gray-400 text-xs font-bold italic">
                  Henüz bir yükleme talebiniz bulunmuyor.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon, label, value, dark = false }: { icon: any, label: string, value: string, dark?: boolean }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${dark ? 'bg-gray-50 text-gray-400' : 'bg-white/5 text-white/30 group-hover:bg-white/10 group-hover:text-white'}`}>
        {icon}
      </div>
      <div>
        <p className={`text-[8px] font-black tracking-[0.1em] uppercase ${dark ? 'text-gray-400' : 'text-white/20'}`}>{label}</p>
        <p className={`text-sm font-bold transition-all ${dark ? 'text-dark-gray' : 'text-white/80 group-hover:text-white'} truncate max-w-[120px]`}>{value || '-'}</p>
      </div>
    </div>
  );
}
