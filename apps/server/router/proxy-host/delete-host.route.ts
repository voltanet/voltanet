import { proxyHostIdSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

export const deleteHostRoute = safeRoute
  .route({ method: "DELETE", tags: ["Proxy Hosts"], path: "/proxy-host/delete" })
  .input(proxyHostIdSchema)
  .output(z.string())
  .errors({ NOT_FOUND: { message: "Proxy host not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.proxyHost.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.proxyHost.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await trx.delete(schema.proxyHost).where(where);

      return "Proxy host deleted successfully";
    });
  });
