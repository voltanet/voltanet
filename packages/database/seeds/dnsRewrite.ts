import { schema, seeder } from "@/database";

const dnsRewrite = seeder(async (trx, dev) => {
  if (dev) {
    await trx.insert(schema.dnsRewrite).values({
      id: "00000000-0000-0000-0000-000000000000",
      name: "HomeLab DNS",
      enabled: true,
      domain: ".home.local",
      destination: "192.168.1.100",
      type: "A",
    });
    await trx.insert(schema.dnsRewrite).values({
      id: "10000000-0000-0000-0000-000000000000",
      name: "Project DNS",
      enabled: true,
      domain: ".project.local",
      destination: "192.168.1.100",
      type: "A",
      upstreamId: "00000000-0000-0000-0000-000000000000",
    });
  }
});

export const seeds = [dnsRewrite];
