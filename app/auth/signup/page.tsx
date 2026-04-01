import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SignupContent from "@/components/auth/SignupContent";

export default async function SignupPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] flex items-center justify-center py-20">
      <SignupContent />
    </main>
  );
}
