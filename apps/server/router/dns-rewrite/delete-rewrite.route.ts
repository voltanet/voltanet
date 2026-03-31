import { rewriteIdSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

export const deleteRewriteRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Rewrites"], path: "/dns-rewrite/delete" })
  .input(rewriteIdSchema)
  .output(z.string())
  .errors({ NOT_FOUND: { message: "DNS rewrite not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.dnsRewrite.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.dnsRewrite.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await trx.delete(schema.dnsRewrite).where(where);

      return "DNS rewrite deleted successfully";
    });
  });
