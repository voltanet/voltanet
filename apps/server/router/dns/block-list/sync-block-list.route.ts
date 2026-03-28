import { safeRoute } from "@/router/base";

export const syncBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Block Lists"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
