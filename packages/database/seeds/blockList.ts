import { schema, seeder } from "@/database";

const blockList = seeder(async (trx, dev) => {
  if (dev) {
    await trx.insert(schema.blockList).values({
      id: "00000000-0000-0000-0000-000000000000",
      name: "StevenBlack",
      enabled: true,
      type: "url",
      value: "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts",
      count: 0,
      lastSyncAt: new Date(),
    });
    await trx.insert(schema.blockList).values({
      id: "10000000-0000-0000-0000-000000000000",
      name: "AdAway",
      enabled: true,
      type: "url",
      value: "https://raw.githubusercontent.com/AdAway/adaway.github.io/master/hosts.txt",
      count: 0,
      lastSyncAt: new Date(),
    });
  }
});

export const seeds = [blockList];
