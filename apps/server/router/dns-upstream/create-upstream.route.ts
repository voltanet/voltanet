import { createUpstreamSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createUpstreamRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Upstreams"], path: "/dns-upstream/create" })
  .input(createUpstreamSchema)
  .handler(async ({ context, input }) => {
    const { db, schema } = context;

    await db.insert(schema.dnsUpstream).values(input);

    return "DNS upstream created successfully";
  });
