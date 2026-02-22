// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const headerPayload = await headers();
    const ip = headerPayload.get("x-forwarded-for")?.split(',')[0] || "anonymous";
    const now = new Date();

    // 1. Check the last message from this IP
    const lastMessage = await prisma.contactMessage.findFirst({
      where: { ip },
      orderBy: { createdAt: 'desc' }
    });

    if (lastMessage) {
      const diff = now.getTime() - lastMessage.createdAt.getTime();
      const limit = 60000; // 60 seconds

      if (diff < limit) {
        const remaining = Math.ceil((limit - diff) / 1000);
        return NextResponse.json(
          { error: `Çok fazla deneme. Lütfen ${remaining} saniye bekleyin.` },
          { status: 429 }
        );
      }
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // 2. Server-side Validation
    if (!name || name.length < 2) return NextResponse.json({ error: "İsim çok kısa." }, { status: 400 });
    if (!email.includes("@")) return NextResponse.json({ error: "Geçerli bir e-posta girin." }, { status: 400 });
    if (!message || message.length < 10) return NextResponse.json({ error: "Mesaj en az 10 karakter olmalı." }, { status: 400 });

    // 3. Save Message with IP
    const newMessage = await prisma.contactMessage.create({
      data: { 
        ip,
        name, 
        email, 
        subject, 
        message 
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Mesaj gönderilemedi." }, { status: 500 });
  }
}