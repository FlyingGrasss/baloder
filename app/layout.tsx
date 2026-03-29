import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"
import BottomBar from "@/components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BALÖDER - BAL Öğrenci Derneği",
  description:
    "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi. BAL ruhunu geleceğe taşıyoruz.",
  metadataBase: new URL("https://www.balogrenci.com"),
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
    url: "https://www.balogrenci.com",
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
        <div className="flex flex-col min-h-screen pb-16 relative">
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <BottomBar />
        </div>
        <Analytics />
      </body>
    </html>
  );
}