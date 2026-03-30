import { accessControlIdSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { safeRoute } from "@/router/base";

export const deleteAccessControlRoute = safeRoute
  .route({ method: "DELETE", tags: ["Access Control"], path: "/access-control/delete" })
  .input(accessControlIdSchema)
  .errors({ NOT_FOUND: { message: "Access control not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.accessControl.id, input.id);

    const exists = await db.query.accessControl.findFirst({ where });
    if (!exists) throw errors.NOT_FOUND();

    await db.delete(schema.accessControl).where(where);

    return "Access control deleted successfully";
  });
