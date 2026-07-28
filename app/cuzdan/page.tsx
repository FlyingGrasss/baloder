import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import WalletClient from "./WalletClient";
import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, UserPlus, Wallet as WalletIcon, ShieldCheck, Zap, ThumbsUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Dijital Cüzdan | BALÖDER",
  robots: { index: false, follow: true },
};

export default async function WalletPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex flex-col items-center p-4">
        <div className="w-full max-w-xl text-center space-y-8 mt-12">
           <div className="space-y-4">
              <div className="w-20 h-20 bg-bordeaux text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-bordeaux/20 mb-6 translate-y-0 hover:-translate-y-1 transition-transform duration-300">
                 <WalletIcon size={40} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-dark-gray tracking-tighter uppercase italic leading-tight">
                 Dijital <br /> Cüzdan
              </h1>
              <p className="text-base md:text-lg text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                 Kantin harcamalarınızı yönetmek ve bakiyenizi takip etmek için giriş yapmalısınız.
              </p>
           </div>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/auth/login"
                className="w-full sm:w-auto px-8 py-4 bg-dark-gray text-white rounded-full font-bold uppercase tracking-wider hover:bg-bordeaux transition-all shadow-lg flex items-center justify-center gap-2"
              >
                 <LogIn size={20} /> Giriş Yap
              </Link>
              <Link 
                href="/auth/signup"
                className="w-full sm:w-auto px-8 py-4 bg-white text-dark-gray rounded-full font-bold uppercase tracking-wider hover:bg-gray-100 transition-all shadow-lg border border-gray-100 flex items-center justify-center gap-2"
              >
                 <UserPlus size={20} /> Kayıt Ol
              </Link>
           </div>

           <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-6 opacity-60">
              <div className="flex flex-col items-center gap-2 grayscale">
                 <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-700">
                    <ShieldCheck size={24} />
                 </div>
                 <span className="text-[11px] font-bold tracking-widest uppercase">Güvenli</span>
              </div>
              <div className="flex flex-col items-center gap-2 grayscale">
                 <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-700">
                    <Zap size={24} />
                 </div>
                 <span className="text-[11px] font-bold tracking-widest uppercase">Hızlı</span>
              </div>
              <div className="hidden md:flex flex-col items-center gap-2 grayscale">
                 <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-700">
                    <ThumbsUp size={24} />
                 </div>
                 <span className="text-[11px] font-bold tracking-widest uppercase">Kolay</span>
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
