import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function DELETE() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    await prisma.$transaction([
      prisma.depositRequest.deleteMany({ where: { userId: user.id } }),
      prisma.walletTransaction.deleteMany({ where: { userId: user.id } }),
      prisma.idCardOrder.deleteMany({ where: { userId: user.id } }),
      prisma.stockHistory.deleteMany({ where: { updatedBy: user.id } }),
      prisma.user.deleteMany({ where: { id: user.id } }),
    ]);
    await supabase.auth.signOut({ scope: "local" });
    return NextResponse.json({ success: true });
  } catch (deleteError) {
    console.error("BALÖDER profile deletion failed", deleteError);
    return NextResponse.json({ error: "BALÖDER data could not be removed." }, { status: 500 });
  }
}
