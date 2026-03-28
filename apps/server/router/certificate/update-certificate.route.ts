import { safeRoute } from "@/router/base";

export const updateCertificateRoute = safeRoute
  .route({ method: "PUT", tags: ["Certificates"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
