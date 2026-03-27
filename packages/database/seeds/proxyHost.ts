import { schema, seeder } from "@/database";

const proxyHost = seeder(async (trx, dev) => {
  if (dev) {
    await trx.insert(schema.proxyHost).values({
      id: "00000000-0000-0000-0000-000000000000",
      name: "HomeLab Proxy",
      enabled: true,
      domains: ["https://home.local", "https://storage.home.local"],
      destination: { protocol: "http", hostname: "192.168.1.100", port: 80 },
      websocket: true,
      accessControlId: "00000000-0000-0000-0000-000000000000",
      certificateId: "00000000-0000-0000-0000-000000000000",
    });
    await trx.insert(schema.proxyHost).values({
      id: "10000000-0000-0000-0000-000000000000",
      name: "Project Proxy",
      enabled: true,
      domains: ["https://project.local", "https://docs.project.local"],
      destination: { protocol: "http", hostname: "192.168.1.100", port: 80 },
      forceHttps: true,
      websocket: true,
      certificateId: "10000000-0000-0000-0000-000000000000",
    });
    await trx.insert(schema.proxyHost).values({
      id: "20000000-0000-0000-0000-000000000000",
      name: "HomeLab WiFi",
      enabled: false,
      domains: ["https://wifi.home.local"],
      destination: { protocol: "https", hostname: "192.168.1.1", port: 443 },
      forceHttps: true,
    });
  }
});

export const seeds = [proxyHost];
