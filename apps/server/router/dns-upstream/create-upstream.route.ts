import { createUpstreamSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createUpstreamRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Upstreams"] })
  .input(createUpstreamSchema)
  // .errors({})
  .handler(async (c) => {});
