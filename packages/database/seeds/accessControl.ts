import { schema, seeder } from "@/database";

const accessControl = seeder(async (trx, dev) => {
  if (dev) {
    await trx.insert(schema.accessControl).values({
      id: "00000000-0000-0000-0000-000000000000",
      name: "System Moderation",
      rule: "deny",
      exceptions: ["192.168.1.0/24", "172.17.0.0/16"],
      satisfy: "all",
      credentials: [
        {
          id: "00000000-0000-0000-0000-000000000000",
          username: "admin",
          password: Bun.password.hashSync("changeme", "bcrypt"),
        },
        {
          id: "10000000-0000-0000-0000-000000000000",
          username: "manager",
          password: Bun.password.hashSync("changeme", "bcrypt"),
        },
      ],
    });
  }
});

export const seeds = [accessControl];
