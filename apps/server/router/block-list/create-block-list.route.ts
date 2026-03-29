import { createBlockListSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["Block Lists"], path: "/block-list/create" })
  .input(createBlockListSchema)
  // .errors({})
  .handler(async (c) => {});
