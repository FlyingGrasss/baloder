import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LoginContent from "@/components/auth/LoginContent";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // Only redirect if they already have a complete profile
    const profile = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true } })
    if (profile) redirect("/");
    else redirect("/auth/complete-profile");
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] flex items-center justify-center py-20">
      <LoginContent />
    </main>
  );
}
