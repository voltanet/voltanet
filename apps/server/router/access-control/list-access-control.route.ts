import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listAccessControlRoute = safeRoute
  .route({ method: "GET", tags: ["Access Control"], path: "/access-control/list" })
  .input(paginationSchema)
  .handler(async ({ context, input }) => {
    const { db, schema } = context;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.accessControl);
      const items = (
        await trx.query.accessControl.findMany({
          orderBy: (table, { desc }) => [desc(table[input.sort])],
          where: input.search ? (table, op) => op.like(table.name, `%${input.search}%`) : undefined,
          offset: (input.page - 1) * input.limit,
          limit: input.limit,
        })
      ).map(({ credentials, ...rest }) => ({
        // Hide credentials passwords
        ...rest,
        credentials: credentials.map(({ username }) => ({ username, password: "" })),
      }));
      return { total, items };
    });
  });
