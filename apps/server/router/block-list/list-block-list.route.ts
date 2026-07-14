import {
  createBlockListSchema,
  listOutputSchema,
  metaSchema,
  paginationSchema,
} from "@repo/shared/validation";
import { like } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

const outputSchema = createBlockListSchema.extend({
  count: z.number(),
  lastSyncAt: z.date(),
});

export const listBlockListRoute = safeRoute
  .route({ method: "GET", tags: ["Block Lists"], path: "/block-list/list" })
  .input(paginationSchema)
  .output(listOutputSchema(metaSchema.extend(outputSchema.shape)))
  .handler(async ({ context, input }) => {
    const { db, schema } = context;
    const where = input.search ? like(schema.blockList.name, `%${input.search}%`) : undefined;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.blockList);
      const found = await trx.$count(schema.blockList, where);

      const items = await trx.query.blockList.findMany({
        orderBy: (table, op) => [op[input.direction](table[input.sort])],
        offset: (input.page - 1) * input.limit,
        limit: input.limit,
        where,
      });

      return { total, found, items };
    });
  });
