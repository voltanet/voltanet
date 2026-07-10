import { db, schema } from "@repo/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// Shared Auth types
export type AuthOptions = typeof auth.options;

// Better Auth instance
export const auth = betterAuth({
  // Use Drizzle ORM
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  advanced: { disableOriginCheck: process.env.NODE_ENV !== "production" },
  // Auth configurations
  user: {
    changeEmail: { enabled: true, updateEmailWithoutVerification: true },
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    password: {
      hash: (pass) => Bun.password.hash(pass, "bcrypt"),
      verify: (data) => Bun.password.verify(data.password, data.hash, "bcrypt"),
    },
  },
});
