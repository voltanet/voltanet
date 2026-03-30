import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listAccessControlRoute = safeRoute
  .route({ method: "GET", tags: ["Access Control"], path: "/access-control/list" })
  .input(paginationSchema)
  .handler(async ({ context, input }) => {
    const { db } = context;

    const result = await db.query.accessControl.findMany({
      orderBy: (table, { desc }) => [desc(table[input.sort])],
      where: input.search ? (table, op) => op.ilike(table.name, `%${input.search}%`) : undefined,
      offset: (input.page - 1) * input.limit,
      limit: input.limit,
    });

    return result.map(({ credentials, ...rest }) => ({
      // Hide credentials passwords
      credentials: credentials.map(({ username }) => ({ username, password: "" })),
      ...rest,
    }));
  });
