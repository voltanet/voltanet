import { updateCertificateSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateCertificateRoute = safeRoute
  .route({ method: "PUT", tags: ["Certificates"] })
  .input(updateCertificateSchema)
  // .errors({})
  .handler(async (c) => {});
