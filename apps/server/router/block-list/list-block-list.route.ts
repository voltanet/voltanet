import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listBlockListRoute = safeRoute
  .route({ method: "GET", tags: ["Block Lists"], path: "/block-list/list" })
  .input(paginationSchema)
  .handler(async ({ context, input }) => {
    const { db } = context;

    return db.query.blockList.findMany({
      orderBy: (table, { desc }) => [desc(table[input.sort])],
      where: input.search ? (table, op) => op.ilike(table.name, `%${input.search}%`) : undefined,
      offset: (input.page - 1) * input.limit,
      limit: input.limit,
    });
  });
