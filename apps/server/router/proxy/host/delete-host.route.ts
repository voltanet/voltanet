import { safeRoute } from "@/router/base";

export const deleteHostRoute = safeRoute
  .route({ method: "DELETE", tags: ["Proxy Hosts"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
