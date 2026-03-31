// lib/prisma.ts
// IMPORTANT: Do NOT move the adapter instantiation outside this pattern.
// The adapter (which creates a pg.Pool) must only be created once.
// Using ?? ensures the right-hand side is only evaluated when no singleton exists.

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      // Use the pooler URL at runtime to stay within connection limits.
      // DIRECT_URL is only needed for migrations (prisma migrate/db push).
      connectionString: process.env.DATABASE_URL,
      max: 2, // Keep the pg.Pool small; pgBouncer handles the rest
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}