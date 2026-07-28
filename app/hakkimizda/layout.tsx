import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | BALÖDER",
  description:
    "BALÖDER'in misyonu, vizyonu ve öğrenci dayanışmasını güçlendiren çalışma alanları.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
