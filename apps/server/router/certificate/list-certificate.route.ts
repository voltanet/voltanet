import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listCertificateRoute = safeRoute
  .route({ method: "GET", tags: ["Certificates"], path: "/certificate/list" })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
