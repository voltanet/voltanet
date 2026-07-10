import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `${__dirname}/data/db.sqlite`,
  },
});
