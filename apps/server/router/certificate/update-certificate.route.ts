import { updateCertificateSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { safeRoute } from "@/router/base";
import { handleFile } from "@/utils/handle-file";

export const updateCertificateRoute = safeRoute
  .route({ method: "PUT", tags: ["Certificates"], path: "/certificate/update" })
  .input(updateCertificateSchema)
  .errors({ NOT_FOUND: { message: "Certificate not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.certificate.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.certificate.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      if (input.cert) await handleFile(`certificate/${exists.id}.pem`, input.cert);
      if (input.key) await handleFile(`certificate/${exists.id}.key`, input.key);
      await trx.update(schema.certificate).set(input).where(where);

      return "Certificate updated successfully";
    });
  });
