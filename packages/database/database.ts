import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL ?? `${__dirname}/data/db.sqlite`;

export type $DB = typeof db;
export type $DBTrx = Parameters<Parameters<$DB["transaction"]>[0]>[0];
export const db = drizzle(DATABASE_URL, { schema });

export { schema };

export const seeder = (e: (trx: $DBTrx, dev?: boolean) => Promise<void>) => e;
export const migrator = async () => {
  try {
    const start = Date.now();
    const migrationsFolder =
      process.env.NODE_ENV == "production" ? "/app/migrations" : `${__dirname}/migrations`;
    migrate(db, { migrationsFolder });
    console.log(`Migrations completed successfully in ${Date.now() - start}ms`);
  } catch (error) {
    console.error("Migrations failed: ", error);
    throw error;
  }
};
