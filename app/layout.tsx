import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://balogrenci.org/#organization",
      name: "BALÖDER",
      alternateName: "Bornova Anadolu Lisesi Öğrenci Derneği",
      url: "https://balogrenci.org",
      logo: "https://balogrenci.org/icon.png",
      description:
        "Bornova Anadolu Lisesi öğrencilerinin sosyal, kültürel ve akademik gelişimini destekleyen bağımsız öğrenci derneği.",
      sameAs: [
        "https://www.instagram.com/balogrenci/",
        "https://linktr.ee/baloder",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://balogrenci.org/#website",
      url: "https://balogrenci.org",
      name: "BALÖDER",
      alternateName: "BAL Öğrenci Derneği",
      inLanguage: "tr-TR",
      publisher: { "@id": "https://balogrenci.org/#organization" },
    },
  ],
};

export const metadata: Metadata = {
  title: "BALÖDER - BAL Öğrenci Derneği",
  description:
    "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi. BAL ruhunu geleceğe taşıyoruz.",
  metadataBase: new URL("https://balogrenci.org"),
  keywords: [
    "Bornova Anadolu Lisesi",
    "BAL",
    "BALÖDER",
    "Öğrenci Derneği",
    "BAL Ruhu",
    "İzmir",
  ],
  openGraph: {
    title: "BALÖDER - BAL Öğrenci Derneği",
    description:
      "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi. BAL ruhunu geleceğe taşıyoruz.",
    url: "https://balogrenci.org",
    siteName: "BALÖDER",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BALÖDER - BAL Öğrenci Derneği",
    description:
      "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased bg-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
        <div className="flex flex-col min-h-screen relative">
          <Navbar />
          <div className="flex-grow min-h-0">
            {children}
          </div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
