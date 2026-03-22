import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL ?? `${__dirname}/data/db.sqlite`;

export type $DB = typeof db;
export type $DBTrx = Parameters<Parameters<$DB["transaction"]>[0]>[0];
export const seeder = (e: (trx: $DBTrx, dev?: boolean) => Promise<void>) => e;
export const db = drizzle(DATABASE_URL, { schema });

export { schema };
