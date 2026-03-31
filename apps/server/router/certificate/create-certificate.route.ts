import { createCertificateSchema } from "@repo/validation";
import { z } from "zod";
import { safeRoute } from "@/router/base";
import { handleFile } from "@/utils/handle-file";

export const createCertificateRoute = safeRoute
  .route({ method: "POST", tags: ["Certificates"], path: "/certificate/create" })
  .input(createCertificateSchema)
  .output(z.string())
  .handler(async ({ context, input }) => {
    const { db, schema } = context;
    const id = crypto.randomUUID().split("-")[0];

    await handleFile(`certificate/${id}.pem`, input.cert);
    await handleFile(`certificate/${id}.key`, input.key);

    await db.insert(schema.certificate).values({ ...input, id });

    return "Certificate created successfully";
  });
