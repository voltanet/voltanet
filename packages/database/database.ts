import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import * as schema from "./schema";

const isProd = process.env.NODE_ENV === "production";
const DATABASE_URL = isProd ? "./data/db.sqlite" : `${__dirname}/data/db.sqlite`;

export type $DB = typeof db;
export type $DBTrx = Parameters<Parameters<$DB["transaction"]>[0]>[0];
export const db = drizzle(DATABASE_URL, { schema });

export { schema };

export const seeder = (e: (trx: $DBTrx, dev?: boolean) => Promise<void>) => e;
export const migrator = async () => {
  try {
    const migrationsFolder = isProd ? "./migrations" : `${__dirname}/migrations`;
    migrate(db, { migrationsFolder });
  } catch (error) {
    console.error("Migrations failed: ", error);
    throw error;
  }
};
