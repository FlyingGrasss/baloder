import { prisma } from "@/lib/prisma";
import DonationClient from "./DonationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bağış | BALÖDER",
  description:
    "BALÖDER çalışmalarına destek olmak için bağış bilgileri ve güncel dernek bütçeleri.",
  alternates: { canonical: "/bagis" },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const budgets = await prisma.budget.findMany({
    include: { transactions: true }
  });

  return <DonationClient initialBudgets={budgets} />;
}
