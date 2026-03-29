import { prisma } from "@/lib/prisma";
import DonationClient from "./DonationClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const budgets = await prisma.budget.findMany({
    include: { transactions: true }
  });

  return <DonationClient initialBudgets={budgets} />;
}
