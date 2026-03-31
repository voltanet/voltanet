import { updateProxyHostSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

export const updateHostRoute = safeRoute
  .route({ method: "PUT", tags: ["Proxy Hosts"], path: "/proxy-host/update" })
  .input(updateProxyHostSchema)
  .output(z.string())
  .errors({ NOT_FOUND: { message: "Proxy host not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.proxyHost.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.proxyHost.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await trx
        .update(schema.proxyHost)
        .set({ ...input, id: undefined })
        .where(where);

      return "Proxy host updated successfully";
    });
  });
