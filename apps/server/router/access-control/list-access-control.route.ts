import {
  createAccessControlSchema,
  listOutputSchema,
  metaSchema,
  paginationSchema,
} from "@repo/validation";
import { like } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";

const outputSchema = createAccessControlSchema.extend({
  credentials: z.array(
    z.object({
      username: z.string(),
      password: z.string(),
    }),
  ),
});

export const listAccessControlRoute = safeRoute
  .route({ method: "GET", tags: ["Access Control"], path: "/access-control/list" })
  .input(paginationSchema)
  .output(listOutputSchema(metaSchema.extend(outputSchema.shape)))
  .handler(async ({ context, input }) => {
    const { db, schema } = context;
    const where = input.search ? like(schema.accessControl.name, `%${input.search}%`) : undefined;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.accessControl);
      const found = await trx.$count(schema.accessControl, where);

      const results = await trx.query.accessControl.findMany({
        orderBy: (table, op) => [op[input.direction](table[input.sort])],
        offset: (input.page - 1) * input.limit,
        limit: input.limit,
        where,
      });

      // Hide credentials passwords
      const items = results.map(({ credentials, ...rest }) => ({
        ...rest,
        credentials: credentials.map(({ username }) => ({ username, password: "" })),
      }));

      return { total, found, items };
    });
  });
