import { schema, seeder } from "@/database";

const id = "00000000-0000-0000-0000-000000000000";

const user = seeder(async (trx) => {
  await trx.insert(schema.user).values({
    id,
    name: "System Admin",
    email: "admin@example.com",
    emailVerified: true,
  });
});

const account = seeder(async (trx) => {
  await trx.insert(schema.account).values({
    id,
    userId: id,
    accountId: id,
    password: Bun.password.hashSync("changeme", "bcrypt"),
    providerId: "credential",
  });
});

export const seeds = [user, account];
