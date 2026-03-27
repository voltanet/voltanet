import { schema, seeder } from "@/database";

const certificate = seeder(async (trx, dev) => {
  if (dev) {
    await trx.insert(schema.certificate).values({
      id: "00000000-0000-0000-0000-000000000000",
      name: "HomeLab Root CA",
      cert: "=====BEGIN CERTIFICATE=====\n...\n=====END CERTIFICATE=====",
      key: "=====BEGIN PRIVATE KEY=====\n...\n=====END PRIVATE KEY=====",
      expiresAt: new Date("2040-01-01"),
    });
    await trx.insert(schema.certificate).values({
      id: "10000000-0000-0000-0000-000000000000",
      name: "Project Root CA",
      cert: "=====BEGIN CERTIFICATE=====\n...\n=====END CERTIFICATE=====",
      key: "=====BEGIN PRIVATE KEY=====\n...\n=====END PRIVATE KEY=====",
      expiresAt: new Date("2040-01-01"),
    });
  }
});

export const seeds = [certificate];
