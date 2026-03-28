import { updateBlockListSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateBlockListRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Block Lists"] })
  .input(updateBlockListSchema)
  // .errors({})
  .handler(async (c) => {});
