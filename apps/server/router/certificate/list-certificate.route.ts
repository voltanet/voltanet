import { safeRoute } from "@/router/base";

export const listCertificateRoute = safeRoute
  .route({ method: "GET", tags: ["Certificates"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
