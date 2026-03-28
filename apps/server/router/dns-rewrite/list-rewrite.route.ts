import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listRewriteRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Rewrites"] })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
