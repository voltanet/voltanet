import { db } from "@/database";
import * as stacks from "@/seeds";

const start = Date.now();
const dev = process.env.NODE_ENV === "development";
const seeds = Object.values(stacks).flatMap((stack) => stack.seeds);

db.transaction(async (trx) => seeds.map((seed) => seed(trx, dev)))
  .finally(() => console.log(`Seeding completed successfully in ${Date.now() - start}ms`))
  .catch((err: Error) => console.error("Seeding failed: ", err));
