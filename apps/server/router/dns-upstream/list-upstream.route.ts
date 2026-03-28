import { safeRoute } from "@/router/base";

export const listUpstreamRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Upstreams"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
