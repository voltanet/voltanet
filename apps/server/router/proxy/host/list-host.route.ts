import { safeRoute } from "@/router/base";

export const listHostRoute = safeRoute
  .route({ method: "GET", tags: ["Proxy Hosts"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
