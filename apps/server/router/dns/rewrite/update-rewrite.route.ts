import { safeRoute } from "@/router/base";

export const updateRewriteRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Rewrites"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
