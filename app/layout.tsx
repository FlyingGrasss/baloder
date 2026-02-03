import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BALÖDER - BAL Öğrenci Derneği",
  description:
    "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi. BAL ruhunu geleceğe taşıyoruz.",
  metadataBase: new URL("https://baloder.org"), // Replace with your actual domain later
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
    url: "https://baloder.org",
    siteName: "BALÖDER",
    locale: "tr_TR",
    images: [
      {
        url: "/icon.png",
        width: 150,
        height: 150,
        alt: "BALÖDER Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BALÖDER - BAL Öğrenci Derneği",
    description:
      "Bornova Anadolu Lisesi Öğrenci Derneği Resmi Web Sitesi.",
    images: ["/icon.png"],
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
        {/* min-h-screen ensures the background covers the whole page.
            We use flex-col to keep the footer at the bottom if content is short.
        */}
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