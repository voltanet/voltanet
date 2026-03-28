import { safeRoute } from "@/router/base";

export const updateHostRoute = safeRoute
  .route({ method: "PUT", tags: ["Proxy Hosts"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
