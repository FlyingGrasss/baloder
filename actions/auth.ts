"use server";

import { redirect } from "next/navigation";
import { safePath } from "@/lib/bal-id-oauth";
import { createClient } from "@/lib/supabase/server";

const unifiedMessage = "Authentication is managed by BAL ID. Continue with BAL ID instead.";

export async function signInWithGoogle(): Promise<{ error?: string }> {
  redirect("/auth/bal-id");
}

export async function completeGoogleProfile(formData: FormData): Promise<{ error?: string }> {
  void formData;
  return { error: unifiedMessage };
}

export async function signup(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  void formData;
  return { error: unifiedMessage };
}

export async function login(formData: FormData): Promise<{ error?: string }> {
  const next = safePath(String(formData.get("callbackUrl") ?? "/"));
  redirect(`/auth/bal-id?next=${encodeURIComponent(next)}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/");
}

export async function forgotPassword(formData: FormData): Promise<{ error?: string }> {
  void formData;
  return { error: unifiedMessage };
}

export async function verifyOtp(formData: FormData): Promise<{ error?: string }> {
  void formData;
  return { error: unifiedMessage };
}

export async function resendOtp(email: string, type: "signup" | "recovery" | "email_change"): Promise<{ error?: string; success?: string }> {
  void email;
  void type;
  return { error: unifiedMessage };
}
