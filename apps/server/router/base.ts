import { os } from "@orpc/server";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { dbMiddleware } from "@/middlewares/db.middleware";

// Base public procedure
export const publicRoute = os
  .$context<{ headers: Headers }>()
  .errors({ INTERNAL_SERVER_ERROR: { message: "Internal server error" } })
  .use(dbMiddleware);

// Extend public procedure with auth layer
export const safeRoute = publicRoute.use(authMiddleware);
