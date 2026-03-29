import { createRewriteSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createRewriteRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Rewrites"], path: "/dns-rewrite/create" })
  .input(createRewriteSchema)
  // .errors({})
  .handler(async (c) => {});
