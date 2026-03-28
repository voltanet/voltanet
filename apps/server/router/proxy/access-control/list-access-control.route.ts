import { safeRoute } from "@/router/base";

export const listAccessControlRoute = safeRoute
  .route({ method: "GET", tags: ["Access Controls"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
