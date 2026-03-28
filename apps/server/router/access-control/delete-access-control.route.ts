import { accessControlIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const deleteAccessControlRoute = safeRoute
  .route({ method: "DELETE", tags: ["Access Controls"] })
  .input(accessControlIdSchema)
  // .errors({})
  .handler(async (c) => {});
