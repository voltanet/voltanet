import { upstreamIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const deleteUpstreamRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Upstreams"], path: "/dns-upstream/delete" })
  .input(upstreamIdSchema)
  // .errors({})
  .handler(async (c) => {});
