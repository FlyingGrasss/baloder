import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import WalletClient from "./WalletClient";
import Link from "next/link";
import { LogIn, UserPlus, Wallet as WalletIcon } from "lucide-react";

export default async function WalletPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-24 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl text-center space-y-12">
           <div className="space-y-6">
              <div className="w-24 h-24 bg-bordeaux text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-bordeaux/20 mb-10 translate-y-0 hover:-translate-y-2 transition-transform duration-500">
                 <WalletIcon size={48} />
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-dark-gray tracking-tighter uppercase italic leading-tight">
                 Dijital <br /> Cüzdan
              </h1>
              <p className="text-xl text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                 Kantin harcamalarınızı yönetmek ve bakiyenizi takip etmek için giriş yapmalısınız.
              </p>
           </div>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/auth/login"
                className="w-full sm:w-auto px-10 py-6 bg-dark-gray text-white rounded-[2rem] font-black uppercase tracking-[0.3em] hover:bg-bordeaux transition-all shadow-xl flex items-center justify-center gap-3"
              >
                 <LogIn size={20} /> Giriş Yap
              </Link>
              <Link 
                href="/auth/signup"
                className="w-full sm:w-auto px-10 py-6 bg-white text-dark-gray rounded-[2rem] font-black uppercase tracking-[0.3em] hover:bg-gray-100 transition-all shadow-xl border border-gray-100 flex items-center justify-center gap-3"
              >
                 <UserPlus size={20} /> Kayıt Ol
              </Link>
           </div>

           <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-20">
              {/* Decorative Icons */}
              <div className="flex flex-col items-center gap-3 grayscale">
                 <div className="w-12 h-12 rounded-2xl border-2 border-current" />
                 <span className="text-[10px] font-black tracking-widest uppercase">Güvenli</span>
              </div>
              <div className="flex flex-col items-center gap-3 grayscale">
                 <div className="w-12 h-12 rounded-2xl border-2 border-current" />
                 <span className="text-[10px] font-black tracking-widest uppercase">Hızlı</span>
              </div>
              <div className="hidden md:flex flex-col items-center gap-3 grayscale">
                 <div className="w-12 h-12 rounded-2xl border-2 border-current" />
                 <span className="text-[10px] font-black tracking-widest uppercase">Kolay</span>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Fetch real data for authenticated user
  const [dbUser, transactions, pendingRequests, idCardOrders] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.walletTransaction.findMany({ 
      where: { userId: user.id }, 
      orderBy: { date: 'desc' },
      take: 20
    }),
    prisma.depositRequest.findMany({ 
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.idCardOrder.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return (
    <WalletClient 
      initialBalance={dbUser?.balance || 0}
      initialTransactions={transactions}
      pendingRequests={pendingRequests}
      dbUser={dbUser}
      idCardOrders={idCardOrders}
    />
  );
}
