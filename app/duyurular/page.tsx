import { prisma } from "@/lib/prisma";
import AnnouncementsClient from "./AnnouncementsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duyurular | BALÖDER",
  description:
    "BALÖDER ve Bornova Anadolu Lisesi öğrencileriyle ilgili güncel duyurular.",
  alternates: { canonical: "/duyurular" },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <AnnouncementsClient initialAnnouncements={announcements} />;
}
