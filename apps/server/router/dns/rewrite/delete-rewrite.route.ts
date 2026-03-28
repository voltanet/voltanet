import { safeRoute } from "@/router/base";

export const deleteRewriteRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Rewrites"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
