import { updateAccessControlSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateAccessControlRoute = safeRoute
  .route({ method: "PUT", tags: ["Access Control"], path: "/access-control/update" })
  .input(updateAccessControlSchema)
  // .errors({})
  .handler(async (c) => {});
