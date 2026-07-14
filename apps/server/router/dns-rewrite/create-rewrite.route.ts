import { createRewriteSchema } from "@repo/shared/validation";
import { z } from "zod";
import { safeRoute } from "@/router/base";

export const createRewriteRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Rewrites"], path: "/dns-rewrite/create" })
  .input(createRewriteSchema)
  .output(z.string())
  .handler(async ({ context, input }) => {
    const { db, schema } = context;

    await db.insert(schema.dnsRewrite).values(input);

    return "DNS rewrite created successfully";
  });
