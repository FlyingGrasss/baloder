import Link from "next/link";
import { redirect } from "next/navigation";
import { safePath } from "@/lib/bal-id-oauth";
import { createClient } from "@/lib/supabase/server";

const errorMessages: Record<string, string> = {
  access_denied: "BAL ID access was cancelled.",
  "invalid-state": "The sign-in request could not be verified. Please try again.",
  "expired-attempt": "The sign-in request expired. Please try again.",
  "bal-id-config": "BAL ID is not configured for this deployment.",
  "token-exchange": "BAL ID could not complete the sign-in.",
  "invalid-userinfo": "BAL ID did not return a verified identity.",
  "session-creation": "The BALÖDER session could not be created.",
  "bal-id-connection": "BAL ID is temporarily unavailable.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string; next?: string; error?: string }> }) {
  const params = await searchParams;
  const next = safePath(params.next ?? params.callbackUrl);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect(next);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 text-center text-gray-900 shadow-2xl sm:p-9">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#851233]">Unified BAL account</p>
        <h1 className="mt-3 text-3xl font-black">Sign in to BALÖDER</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">BALÖDER no longer keeps a separate password or Google account. Continue with your central BAL ID.</p>
        {params.error ? <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{errorMessages[params.error] ?? "Sign-in failed. Please try again."}</p> : null}
        <Link href={`/auth/bal-id?next=${encodeURIComponent(next)}`} className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#851233] px-5 font-black text-white hover:bg-[#a60f3a]">Continue with BAL ID</Link>
        <p className="mt-5 text-xs leading-5 text-gray-500">Create your account, use Google, or reset your password from BAL ID.</p>
      </section>
    </main>
  );
}
