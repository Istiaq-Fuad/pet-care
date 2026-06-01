import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load local env vars (no-op on Vercel where vars are already in process.env)
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Direct (non-pooling) connection is used by the Prisma CLI for migrations
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: {
    // CLI uses this connection string for migrations; the runtime client uses
    // the driver adapter in src/lib/db.ts (POSTGRES_URL)
    url: env("POSTGRES_URL_NON_POOLING"),
  },
});
