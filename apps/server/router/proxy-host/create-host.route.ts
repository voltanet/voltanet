import { createProxyHostSchema } from "@repo/shared/validation";
import { z } from "zod";
import { safeRoute } from "@/router/base";

export const createHostRoute = safeRoute
  .route({ method: "POST", tags: ["Proxy Hosts"], path: "/proxy-host/create" })
  .input(createProxyHostSchema)
  .output(z.string())
  .handler(async ({ context, input }) => {
    const { db, schema } = context;

    await db.insert(schema.proxyHost).values(input);

    return "Proxy host created successfully";
  });
