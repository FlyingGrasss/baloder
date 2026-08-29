// lib/prisma.ts
// IMPORTANT: Do NOT move the adapter instantiation outside this pattern.
// The adapter (which creates a pg.Pool) must only be created once.
// Using ?? ensures the right-hand side is only evaluated when no singleton exists.

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

const databaseUrl = process.env.DATABASE_URL;
const localDatabase = /localhost|127\.0\.0\.1/i.test(databaseUrl || "");

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      // Use the pooler URL at runtime to stay within connection limits.
      // DIRECT_URL is only needed for migrations (prisma migrate/db push).
      connectionString: normalizeDatabaseUrl(databaseUrl),
      // Some Supabase/pooler environments present a certificate chain that
      // Node cannot validate locally. Keep the connection encrypted while
      // allowing the database adapter to establish the connection.
      ssl: process.env.PGSSL === "false" || localDatabase
        ? false
        : { rejectUnauthorized: false },
      max: 2, // Keep the pg.Pool small; pgBouncer handles the rest
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

function normalizeDatabaseUrl(value: string | undefined) {
  if (!value) return value;

  try {
    const url = new URL(value);
    for (const parameter of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) {
      url.searchParams.delete(parameter);
    }
    return url.toString();
  } catch {
    return value;
  }
}
