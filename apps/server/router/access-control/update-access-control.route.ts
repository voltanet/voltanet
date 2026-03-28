import { updateAccessControlSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateAccessControlRoute = safeRoute
  .route({ method: "PUT", tags: ["Access Controls"] })
  .input(updateAccessControlSchema)
  // .errors({})
  .handler(async (c) => {});
