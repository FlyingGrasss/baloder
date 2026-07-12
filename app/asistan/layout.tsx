import type { Metadata } from "next";
import "./asistan.css";

export const metadata: Metadata = {
  title: "BAL Asistan | Bornova Anadolu Lisesi Yapay Zeka Asistanı",
  description:
    "BALÖDER bünyesindeki BAL Asistan ile Bornova Anadolu Lisesi hakkında yapay zeka destekli, kaynaklı ve hızlı bilgi alın.",
  metadataBase: new URL("https://balogrenci.org"),
  alternates: {
    canonical: "/asistan",
  },
  keywords: [
    "Bornova Anadolu Lisesi",
    "Bornova Anadolu Lisesi yapay zeka",
    "Bornova Anadolu Lisesi asistan",
    "BAL Yapay Zeka",
    "BAL Asistan",
    "BALÖDER",
    "Bornova Anadolu Lisesi hakkında bilgi",
    "İzmir lise asistanı",
  ],
  openGraph: {
    title: "BAL Asistan | Bornova Anadolu Lisesi Yapay Zeka Asistanı",
    description:
      "Bornova Anadolu Lisesi'nin akademik yapısı, kampüsü, gelenekleri, ulaşımı ve öğrenci yaşamı hakkında BALÖDER destekli bilgi asistanı.",
    url: "https://balogrenci.org/asistan",
    siteName: "BALÖDER",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "BALÖDER logosu",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "BAL Asistan | Bornova Anadolu Lisesi Yapay Zeka Asistanı",
    description:
      "Bornova Anadolu Lisesi hakkında BALÖDER destekli yapay zeka asistanı.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AsistanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
