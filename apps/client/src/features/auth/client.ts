// @ts-nocheck - Skip server references errors
import type { AuthOptions } from "@repo/server/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const auth = createAuthClient({
  plugins: [inferAdditionalFields<AuthOptions>()],
  $InferAuth: {} as AuthOptions,
});
