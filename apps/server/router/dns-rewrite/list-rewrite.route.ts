import {
  createRewriteSchema,
  listOutputSchema,
  metaSchema,
  paginationSchema,
} from "@repo/validation";
import { like } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

const outputSchema = createRewriteSchema.omit({ upstreamId: true }).extend({
  upstream: z.object({ id: z.string(), name: z.string() }).nullable(),
});

export const listRewriteRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Rewrites"], path: "/dns-rewrite/list" })
  .input(paginationSchema)
  .output(listOutputSchema(metaSchema.extend(outputSchema.shape)))
  .handler(async ({ context, input }) => {
    const { db, schema } = context;
    const where = input.search ? like(schema.dnsRewrite.name, `%${input.search}%`) : undefined;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.dnsRewrite);
      const found = await trx.$count(schema.dnsRewrite, where);

      const items = await trx.query.dnsRewrite.findMany({
        columns: { upstreamId: false },
        with: { upstream: { columns: { id: true, name: true } } },
        orderBy: (table, op) => [op[input.direction](table[input.sort])],
        offset: (input.page - 1) * input.limit,
        limit: input.limit,
        where,
      });

      return { total, found, items };
    });
  });
