import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CompleteProfileContent from "@/components/auth/CompleteProfileContent";

export default async function CompleteProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Must be logged in via Supabase (Google OAuth session exists)
  if (!user) {
    redirect("/auth/login");
  }

  // If they already completed the profile, send them home
  const existing = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true },
  });

  if (existing) {
    redirect("/");
  }

  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Kullanıcı";

  const email = user.email ?? "";

  return (
    <main className="min-h-screen bg-[#f4f7f9] flex items-center justify-center py-20">
      <CompleteProfileContent name={name} email={email} />
    </main>
  );
}
