import { safeRoute } from "@/router/base";

export const deleteCertificateRoute = safeRoute
  .route({ method: "DELETE", tags: ["Certificates"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
