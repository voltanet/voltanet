import { safeRoute } from "@/router/base";

export const createRewriteRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Rewrites"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
