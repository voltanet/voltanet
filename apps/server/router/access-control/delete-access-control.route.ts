import { accessControlIdSchema } from "@repo/shared/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

export const deleteAccessControlRoute = safeRoute
  .route({ method: "DELETE", tags: ["Access Control"], path: "/access-control/delete" })
  .input(accessControlIdSchema)
  .output(z.string())
  .errors({ NOT_FOUND: { message: "Access control not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.accessControl.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.accessControl.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await trx.delete(schema.accessControl).where(where);

      return "Access control deleted successfully";
    });
  });
