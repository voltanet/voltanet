import { createAccessControlSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createAccessControlRoute = safeRoute
  .route({ method: "POST", tags: ["Access Control"], path: "/access-control/create" })
  .input(createAccessControlSchema)
  // .errors({})
  .handler(async (c) => {});
