import { safeRoute } from "@/router/base";

export const createCertificateRoute = safeRoute
  .route({ method: "POST", tags: ["Certificates"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
