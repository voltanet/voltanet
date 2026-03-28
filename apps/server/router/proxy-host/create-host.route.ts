import { safeRoute } from "@/router/base";

export const createHostRoute = safeRoute
  .route({ method: "POST", tags: ["Proxy Hosts"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
