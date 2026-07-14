import {
  createCertificateSchema,
  listOutputSchema,
  metaSchema,
  paginationSchema,
} from "@repo/shared/validation";
import { like } from "drizzle-orm";
import { safeRoute } from "@/router/base";

export const listCertificateRoute = safeRoute
  .route({ method: "GET", tags: ["Certificates"], path: "/certificate/list" })
  .input(paginationSchema)
  .output(listOutputSchema(metaSchema.extend(createCertificateSchema.shape)))
  .handler(async ({ context, input }) => {
    const { db, schema } = context;
    const where = input.search ? like(schema.certificate.name, `%${input.search}%`) : undefined;

    return await db.transaction(async (trx) => {
      const total = await trx.$count(schema.certificate);
      const found = await trx.$count(schema.certificate, where);

      const items = await trx.query.certificate.findMany({
        orderBy: (table, op) => [op[input.direction](table[input.sort])],
        offset: (input.page - 1) * input.limit,
        limit: input.limit,
        where,
      });

      return { total, found, items };
    });
  });
