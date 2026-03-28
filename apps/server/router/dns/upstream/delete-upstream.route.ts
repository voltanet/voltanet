import { safeRoute } from "@/router/base";

export const deleteUpstreamRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Upstreams"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
