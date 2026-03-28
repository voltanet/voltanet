import { certificateIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const deleteCertificateRoute = safeRoute
  .route({ method: "DELETE", tags: ["Certificates"] })
  .input(certificateIdSchema)
  // .errors({})
  .handler(async (c) => {});
