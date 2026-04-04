import { db, schema } from "@repo/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

// Shared Auth types
export type AuthOptions = typeof auth.options;
const isProd = process.env.NODE_ENV === "production";

// Better Auth instance
export const auth = betterAuth({
  trustedOrigins: isProd ? [] : ["http://localhost:3000"],
  // Use Drizzle ORM
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  // Disable telemetry
  telemetry: { enabled: false },
  // Plugins, features and configurations
  plugins: isProd ? [] : [openAPI({ path: "/docs" })],
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    // TODO: handle emails in production
    requireEmailVerification: false,
    password: {
      hash: (pass) => Bun.password.hash(pass, "bcrypt"),
      verify: (data) => Bun.password.verify(data.password, data.hash, "bcrypt"),
    },
  },
});
