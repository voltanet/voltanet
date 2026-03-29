import { safeRoute } from "@/router/base";

export const createHostRoute = safeRoute
  .route({ method: "POST", tags: ["Proxy Hosts"], path: "/proxy-host/create" })
  // .input()
  // .errors({})
  .handler(async (c) => {});
