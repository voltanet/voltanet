import { rewriteIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const deleteRewriteRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Rewrites"] })
  .input(rewriteIdSchema)
  // .errors({})
  .handler(async (c) => {});
