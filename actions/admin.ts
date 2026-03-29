'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (dbUser?.role !== "ADMIN") throw new Error("Unauthorized");
}

export async function verifyUser(userId: string) {
  await assertAdmin();
  await prisma.user.update({
    where: { id: userId },
    data: { verified: true }
  })
  revalidatePath('/admin')
}

export async function approveReceipt(requestId: string, amount: number) {
  await assertAdmin();
  const request = await prisma.depositRequest.findUnique({
    where: { id: requestId },
  })

  if (!request) return { error: "İşlem bulunamadı." }
  if (request.status !== "PENDING") return { error: "Bu işlem zaten sonuçlandırılmış." }

  // 1. Update user balance and request amount (since it was 0)
  await prisma.user.update({
    where: { id: request.userId },
    data: { balance: { increment: amount } }
  })

  // 2. Update request status and set the final amount
  await prisma.depositRequest.update({
    where: { id: requestId },
    data: { 
      status: "APPROVED",
      amount: amount
    }
  })

  revalidatePath('/admin')
  revalidatePath('/cuzdan')
  revalidatePath('/profile')
  return { success: true }
}

export async function rejectReceipt(requestId: string) {
  await assertAdmin();
  await prisma.depositRequest.update({
    where: { id: requestId },
    data: { status: "REJECTED" }
  })
  revalidatePath('/admin')
}

export async function approveIdCardOrder(orderId: string) {
  await assertAdmin();
  await prisma.idCardOrder.update({
    where: { id: orderId },
    data: { status: "APPROVED" }
  })
  revalidatePath('/admin')
  revalidatePath('/cuzdan')
}

export async function rejectIdCardOrder(orderId: string) {
  await assertAdmin();
  await prisma.idCardOrder.update({
    where: { id: orderId },
    data: { status: "REJECTED" }
  })
  revalidatePath('/admin')
  revalidatePath('/cuzdan')
}

export async function updateIdCardStatus(orderId: string, status: string) {
  await assertAdmin();
  await prisma.idCardOrder.update({
    where: { id: orderId },
    data: { status }
  });
  revalidatePath('/admin');
  revalidatePath('/cuzdan');
}

export async function updateUserStatus(userId: string, data: { isMember?: boolean, isSandikMember?: boolean, verified?: boolean, role?: any }) {
  await assertAdmin();
  const updateData: any = { ...data };
  if (data.isMember || data.isSandikMember) {
    updateData.verified = true; // Auto-verify if given membership
  }
  
  await prisma.user.update({
    where: { id: userId },
    data: updateData
  });
  revalidatePath('/admin');
}

export async function updateBudgetAmount(budgetId: string, total: number, spent: number) {
  await assertAdmin();
  await prisma.budget.upsert({
    where: { id: budgetId },
    create: { id: budgetId, name: budgetId === 'burs' ? 'Öğrenci Burs Fonu' : 'Okul İyileştirme Projeleri', total, spent },
    update: { total, spent }
  });
  revalidatePath('/admin');
  revalidatePath('/bagis');
}

export async function createAnnouncementAction(title: string, excerpt: string, content: string) {
  await assertAdmin();
  await prisma.announcement.create({
    data: { title, excerpt, content }
  });
  revalidatePath('/admin');
}

export async function deleteAnnouncementAction(id: string) {
  await assertAdmin();
  await prisma.announcement.delete({
    where: { id }
  });
  revalidatePath('/admin');
}
