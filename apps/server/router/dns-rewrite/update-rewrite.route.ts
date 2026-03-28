import { updateRewriteSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateRewriteRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Rewrites"] })
  .input(updateRewriteSchema)
  // .errors({})
  .handler(async (c) => {});
