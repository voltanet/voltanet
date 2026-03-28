import { safeRoute } from "@/router/base";

export const updateUpstreamRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Upstreams"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
