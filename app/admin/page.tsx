import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  if (dbUser?.role !== "ADMIN") {
    redirect("/"); // Not an admin
  }


  const [messages, allUsers, pendingReceipts, allIdCardOrders, budgets, announcements, marketItems] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.user.findMany({ 
      orderBy: { createdAt: "desc" } 
    }),
    prisma.depositRequest.findMany({ 
      where: { status: "PENDING" }, 
      include: { user: true }, 
      orderBy: { createdAt: "desc" } 
    }),
    prisma.idCardOrder.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.budget.findMany(),
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.marketItem.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        stockHistory: {
          orderBy: { createdAt: "desc" },
          include: { user: { select: { id: true, name: true } } },
        },
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-dark-gray uppercase tracking-tighter">Yönetici Paneli</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Sistem Genel Bakış ve Yönetim Merkezi</p>
          </div>
        </div>

        <AdminDashboard 
          allUsers={allUsers} 
          pendingReceipts={pendingReceipts} 
          messages={messages} 
          pendingIdCardOrders={allIdCardOrders}
          budgets={budgets}
          announcements={announcements}
          marketItems={marketItems}
        />
      </div>
    </div>
  );
}