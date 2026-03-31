import { upstreamIdSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { safeRoute } from "@/router/base";

export const deleteUpstreamRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Upstreams"], path: "/dns-upstream/delete" })
  .input(upstreamIdSchema)
  .errors({ NOT_FOUND: { message: "DNS upstream not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.dnsUpstream.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.dnsUpstream.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await trx.delete(schema.dnsUpstream).where(where);

      return "DNS upstream deleted successfully";
    });
  });
