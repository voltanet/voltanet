import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { AuthOptions } from "./index";

export type { Session, User } from "better-auth";

type AuthClient = ReturnType<typeof createAuthClient>;

export const auth: AuthClient = createAuthClient({
  plugins: [inferAdditionalFields<AuthOptions>()],
  $InferAuth: {} as AuthOptions,
});
