import { Suspense } from "react";
import LoginContent from "@/components/auth/LoginContent";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f9] flex items-center justify-center py-20">
      <LoginContent />
    </main>
  );
}
