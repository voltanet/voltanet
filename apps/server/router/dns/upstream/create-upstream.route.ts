import { safeRoute } from "@/router/base";

export const createUpstreamRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Upstreams"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
