import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next"
import { SITE_URL } from "@/src/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "BALÖDER",
      alternateName: "Bornova Anadolu Lisesi Öğrenci Derneği",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      description:
        "Bornova Anadolu Lisesi öğrencilerinin sosyal, kültürel ve akademik gelişimini destekleyen bağımsız öğrenci derneği.",
      sameAs: [
        "https://www.instagram.com/balogrenci/",
        "https://linktr.ee/baloder",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "BALÖDER",
      alternateName: "BAL Öğrenci Derneği",
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  title: "BALÖDER - BAL Öğrenci Derneği",
  description:
    "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi. BAL ruhunu geleceğe taşıyoruz.",
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
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
          <SmoothScroll />
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
