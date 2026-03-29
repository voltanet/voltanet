import { updateUpstreamSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateUpstreamRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Upstreams"], path: "/dns-upstream/update" })
  .input(updateUpstreamSchema)
  // .errors({})
  .handler(async (c) => {});
