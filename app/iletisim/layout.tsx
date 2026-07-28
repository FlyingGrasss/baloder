import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | BALÖDER",
  description:
    "BALÖDER ile iletişime geçmek için iletişim formu ve güncel iletişim bilgileri.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
