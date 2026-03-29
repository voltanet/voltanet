import { safeRoute } from "@/router/base";

export const updateHostRoute = safeRoute
  .route({ method: "PUT", tags: ["Proxy Hosts"], path: "/proxy-host/update" })
  // .input()
  // .errors({})
  .handler(async (c) => {});
