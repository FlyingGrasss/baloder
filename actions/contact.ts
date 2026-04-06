"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendContactMessage(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const newMessage = await prisma.contactMessage.create({
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Mesaj başarıyla gönderildi." };
  } catch (error) {
    console.error("Error sending contact message:", error);
    return { success: false, error: "Mesaj gönderilirken bir hata oluştu." };
  }
}
