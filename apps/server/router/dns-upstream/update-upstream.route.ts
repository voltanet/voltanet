import { updateUpstreamSchema } from "@repo/shared/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

export const updateUpstreamRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Upstreams"], path: "/dns-upstream/update" })
  .input(updateUpstreamSchema)
  .output(z.string())
  .errors({ NOT_FOUND: { message: "DNS upstream not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.dnsUpstream.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.dnsUpstream.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await trx
        .update(schema.dnsUpstream)
        .set({ ...input, id: undefined })
        .where(where);

      return "DNS upstream updated successfully";
    });
  });
