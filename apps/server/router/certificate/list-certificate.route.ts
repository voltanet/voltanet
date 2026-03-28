import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listCertificateRoute = safeRoute
  .route({ method: "GET", tags: ["Certificates"] })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
