import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL ?? `${__dirname}/data/db.sqlite`;

export default defineConfig({
  out: "./migrations",
  schema: "./schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
