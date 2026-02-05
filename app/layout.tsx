import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css?inline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BALÖDER - BAL Öğrenci Derneği",
  description:
    "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi. BAL ruhunu geleceğe taşıyoruz.",
  metadataBase: new URL("https://www.balogrenci.org"),
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
    url: "https://www.balogrenci.org",
    siteName: "BALÖDER",
    locale: "tr_TR",
    type: "website",
    // Next.js will automatically find opengraph-image.jpg. 
    // We remove the manual 'images' array here to avoid conflicts 
    // unless you want to use a specific external URL.
  },
  twitter: {
    card: "summary_large_image",
    title: "BALÖDER - BAL Öğrenci Derneği",
    description:
      "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi.",
    // Next.js automatically associates opengraph-image with Twitter cards too.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased bg-[#A21A2A]`}>
        <div className="flex flex-col min-h-screen bg-[#A21A2A]">
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}