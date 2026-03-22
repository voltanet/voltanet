import { os } from "@orpc/server";
import { auth } from "@/utils/auth";

export const authMiddleware = os
  .$context<{ headers: Headers }>()
  .errors({ UNAUTHORIZED: { message: "UNAUTHORIZED: Please login" } })
  .middleware(async ({ context, errors, next }) => {
    // Check Better Auth session
    const session = await auth.api.getSession({ headers: context.headers });
    if (!session) throw errors.UNAUTHORIZED();

    // Mount session
    return next({ context: { ...context, session } });
  });
