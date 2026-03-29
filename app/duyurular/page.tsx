import { prisma } from "@/lib/prisma";
import AnnouncementsClient from "./AnnouncementsClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <AnnouncementsClient initialAnnouncements={announcements} />;
}
