import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listUpstreamRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Upstreams"], path: "/dns-upstream/list" })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
