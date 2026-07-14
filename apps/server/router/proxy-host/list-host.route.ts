import {
  createProxyHostSchema,
  listOutputSchema,
  metaSchema,
  paginationSchema,
} from "@repo/shared/validation";
import { like } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

const outputSchema = createProxyHostSchema
  .omit({ accessControlId: true, certificateId: true })
  .extend({
    accessControl: z.object({ id: z.string(), name: z.string() }).nullable(),
    certificate: z.object({ id: z.string(), name: z.string() }).nullable(),
  });

export const listHostRoute = safeRoute
  .route({ method: "GET", tags: ["Proxy Hosts"], path: "/proxy-host/list" })
  .input(paginationSchema)
  .output(listOutputSchema(metaSchema.extend(outputSchema.shape)))
  .handler(async ({ context, input }) => {
    const { db, schema } = context;
    const where = input.search ? like(schema.proxyHost.name, `%${input.search}%`) : undefined;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.proxyHost);
      const found = await trx.$count(schema.proxyHost, where);

      const items = await trx.query.proxyHost.findMany({
        columns: { accessControlId: false, certificateId: false },
        with: {
          accessControl: { columns: { id: true, name: true } },
          certificate: { columns: { id: true, name: true } },
        },
        orderBy: (table, op) => [op[input.direction](table[input.sort])],
        offset: (input.page - 1) * input.limit,
        limit: input.limit,
        where,
      });

      return { total, found, items };
    });
  });
