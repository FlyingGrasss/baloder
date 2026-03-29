'use server'

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveDepositRequest(blobDetails: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Yetkisiz erişim.' };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!dbUser) {
      return { success: false, error: "Kullanıcı veritabanında bulunamadı. Lütfen çıkış yapıp tekrar giriş yapın (Veritabanı sıfırlanmış olabilir)." };
    }

    const pendingCount = await prisma.depositRequest.count({
      where: { userId: user.id, status: 'PENDING' }
    });

    if (pendingCount >= 3) {
      return { success: false, error: 'Zaten bekleyen 3 adet talebiniz bulunmaktadır.' };
    }

    const newRequest = await prisma.depositRequest.create({
      data: {
        userId: user.id,
        amount: 0,
        receiptUrl: blobDetails.url,
        pathname: blobDetails.pathname,
        size: blobDetails.size,
        contentType: blobDetails.contentType,
        status: 'PENDING'
      }
    });

    revalidatePath('/cuzdan');
    revalidatePath('/admin');
    return { success: true, requestId: newRequest.id };
  } catch (error: any) {
    console.error("[DB] Deposit Save Error:", error);
    return { success: false, error: error.message || 'Bir hata oluştu.' };
  }
}

export async function submitIdCardOrder(formData: {
  name: string,
  studentNo: string,
  department: string,
  deliveryDetails: string,
}, blobDetails: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Yetkisiz erişim.' };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!dbUser?.verified) {
      return { success: false, error: 'Hesabınız henüz onaylanmadı. Sadece onaylanmış hesaplar kart siparişi verebilir.' };
    }

    const newOrder = await prisma.idCardOrder.create({
      data: {
        userId: user.id,
        name: formData.name,
        studentNo: formData.studentNo,
        department: formData.department,
        deliveryDetails: formData.deliveryDetails,
        receiptUrl: blobDetails.url,
        status: 'PENDING'
      }
    });

    revalidatePath('/cuzdan');
    revalidatePath('/admin');
    return { success: true, orderId: newOrder.id };
  } catch (error: any) {
    console.error("[DB] ID Card Order Error:", error);
    return { success: false, error: error.message || 'Kart siparişi oluşturulurken bir hata oluştu.' };
  }
}

export async function requestMembership(type: 'member' | 'sandik') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false };

  if (type === 'member') {
    await prisma.user.update({ where: { id: user.id }, data: { memberRequested: true } });
  } else {
    await prisma.user.update({ where: { id: user.id }, data: { sandikRequested: true } });
  }
  revalidatePath('/cuzdan');
  revalidatePath('/admin');
  return { success: true };
}