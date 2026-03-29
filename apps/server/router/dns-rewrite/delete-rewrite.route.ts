import { rewriteIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const deleteRewriteRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Rewrites"], path: "/dns-rewrite/delete" })
  .input(rewriteIdSchema)
  // .errors({})
  .handler(async (c) => {});
