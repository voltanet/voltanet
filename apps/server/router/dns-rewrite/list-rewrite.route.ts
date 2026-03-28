import { safeRoute } from "@/router/base";

export const listRewriteRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Rewrites"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
