import { safeRoute } from "@/router/base";

export const deleteHostRoute = safeRoute
  .route({ method: "DELETE", tags: ["Proxy Hosts"], path: "/proxy-host/delete" })
  // .input()
  // .errors({})
  .handler(async (c) => {});
