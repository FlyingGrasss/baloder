import { Suspense } from "react";
import SignupContent from "@/components/auth/SignupContent";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f9] flex items-center justify-center py-20">
      <SignupContent />
    </main>
  );
}
