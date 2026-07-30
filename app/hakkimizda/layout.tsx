import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | BALÖDER",
  description:
    "BALÖDER'in öğrenci kooperatifi, ücretsiz su dayanışması, BAL Times çalışmaları, hedefleri ve 2026–2027 çalışma ekibi.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
