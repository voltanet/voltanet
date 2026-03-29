import { updateBlockListSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const updateBlockListRoute = safeRoute
  .route({ method: "PUT", tags: ["Block Lists"], path: "/block-list/update" })
  .input(updateBlockListSchema)
  // .errors({})
  .handler(async (c) => {});
