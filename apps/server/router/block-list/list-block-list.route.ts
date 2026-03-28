import { safeRoute } from "@/router/base";

export const listBlockListRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Block Lists"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
