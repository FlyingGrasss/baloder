import { redirect } from "next/navigation";
import { safePath } from "@/lib/bal-id-oauth";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string; next?: string }> }) {
  const params = await searchParams;
  const next = safePath(params.next ?? params.callbackUrl);
  redirect(`/auth/login?next=${encodeURIComponent(next)}`);
}
