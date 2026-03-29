import { createCertificateSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createCertificateRoute = safeRoute
  .route({ method: "POST", tags: ["Certificates"], path: "/certificate/create" })
  .input(createCertificateSchema)
  // .errors({})
  .handler(async (c) => {});
