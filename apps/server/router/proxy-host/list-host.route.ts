import { safeRoute } from "@/router/base";

export const listHostRoute = safeRoute
  .route({ method: "GET", tags: ["Proxy Hosts"], path: "/proxy-host/list" })
  // .input()
  // .errors({})
  .handler(async (c) => {});
