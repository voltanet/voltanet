import { updateUpstreamSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateUpstreamRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Upstreams"] })
  .input(updateUpstreamSchema)
  // .errors({})
  .handler(async (c) => {});
