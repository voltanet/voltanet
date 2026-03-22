import { os } from "@orpc/server";
import { db, schema } from "@repo/database";

export const dbMiddleware = os.middleware(async ({ context, next }) => {
  // Mount database and schema
  return next({ context: { ...context, db, schema } });
});
