import { updateRewriteSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateRewriteRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Rewrites"], path: "/dns-rewrite/update" })
  .input(updateRewriteSchema)
  // .errors({})
  .handler(async (c) => {});
