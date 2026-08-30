// prisma.config.ts

import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

config({ path: ".env.local" });
config();

function migrationUrl() {
  const url = new URL(env("DIRECT_URL"));
  // Migration files before the namespace migration intentionally create
  // unqualified tables in public, then move them into baloder. Do not force
  // the initial migrations into baloder through the connection URL.
  url.searchParams.delete("schema");
  return url.toString();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationUrl(),
  },
});
