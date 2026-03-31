import { schema, seeder } from "@/database";

const dnsUpstream = seeder(async (trx, dev) => {
  if (dev) {
    await trx.insert(schema.dnsUpstream).values({
      id: "00000000-0000-0000-0000-000000000000",
      name: "Google DNS",
      enabled: true,
      servers: [{ server: "8.8.8.8", port: 53 }],
    });
    await trx.insert(schema.dnsUpstream).values({
      id: "10000000-0000-0000-0000-000000000000",
      name: "Cloudflare DNS",
      enabled: true,
      servers: [{ server: "1.1.1.1", port: 53 }],
    });
  }
});

export const seeds = [dnsUpstream];
