import { safeRoute } from "@/router/base";

export const deleteBlockListRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Block Lists"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
