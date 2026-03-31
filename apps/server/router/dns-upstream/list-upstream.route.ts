import {
  createUpstreamSchema,
  listOutputSchema,
  metaSchema,
  paginationSchema,
} from "@repo/validation";
import { like } from "drizzle-orm";
import { safeRoute } from "@/router/base";

export const listUpstreamRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Upstreams"], path: "/dns-upstream/list" })
  .input(paginationSchema)
  .output(listOutputSchema(metaSchema.extend(createUpstreamSchema.shape)))
  .handler(async ({ context, input }) => {
    const { db, schema } = context;
    const where = input.search ? like(schema.dnsUpstream.name, `%${input.search}%`) : undefined;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.dnsUpstream);
      const found = await trx.$count(schema.dnsUpstream, where);

      const items = await trx.query.dnsUpstream.findMany({
        orderBy: (table, op) => [op[input.direction](table[input.sort])],
        offset: (input.page - 1) * input.limit,
        limit: input.limit,
        where,
      });

      return { total, found, items };
    });
  });
