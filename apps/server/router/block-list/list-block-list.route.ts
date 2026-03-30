import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listBlockListRoute = safeRoute
  .route({ method: "GET", tags: ["Block Lists"], path: "/block-list/list" })
  .input(paginationSchema)
  .handler(async ({ context, input }) => {
    const { db, schema } = context;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.blockList);
      const items = await trx.query.blockList.findMany({
        orderBy: (table, { desc }) => [desc(table[input.sort])],
        where: input.search ? (table, op) => op.like(table.name, `%${input.search}%`) : undefined,
        offset: (input.page - 1) * input.limit,
        limit: input.limit,
      });

      return { total, items };
    });
  });
