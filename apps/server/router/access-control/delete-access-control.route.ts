import { safeRoute } from "@/router/base";

export const deleteAccessControlRoute = safeRoute
  .route({ method: "DELETE", tags: ["Access Controls"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
