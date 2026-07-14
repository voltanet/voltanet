import { certificateIdSchema } from "@repo/shared/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";
import { handleFile } from "@/utils/handle-file";

export const deleteCertificateRoute = safeRoute
  .route({ method: "DELETE", tags: ["Certificates"], path: "/certificate/delete" })
  .input(certificateIdSchema)
  .output(z.string())
  .errors({ NOT_FOUND: { message: "Certificate not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.certificate.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.certificate.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await handleFile(`certificate/${exists.id}.pem`, null);
      await handleFile(`certificate/${exists.id}.key`, null);
      await trx.delete(schema.certificate).where(where);

      return "Certificate deleted successfully";
    });
  });
