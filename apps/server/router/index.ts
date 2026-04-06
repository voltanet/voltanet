import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { serveStatic } from "hono/bun";
import { createMiddleware } from "hono/factory";
import { version } from "@/../../package.json"; // Main repo version
import { router } from "./router";

export { icons } from "./core/icons.route";
export const files = serveStatic({ rewriteRequestPath: (p) => p.replace("/api", "./data") });
export * from "./base";

// Base API routes
export const rpc = createMiddleware(async (c, next) => {
  const handler = new RPCHandler(router);
  const { matched, response } = await handler.handle(c.req.raw, {
    context: { headers: c.req.raw.headers },
    prefix: "/api",
  });

  return matched ? c.newResponse(response.body, response) : await next();
});

// Scalar docs and API routes for development only
export const docs = createMiddleware(async (c, next) => {
  if (process.env.NODE_ENV === "production") return await next();
  const scalar = new OpenAPIReferencePlugin({
    schemaConverters: [new ZodToJsonSchemaConverter()],
    specGenerateOptions: {
      info: { title: "API Reference", version },
    },
  });
  const handler = new OpenAPIHandler(router, { plugins: [scalar] });
  const { matched, response } = await handler.handle(c.req.raw, {
    context: { headers: c.req.raw.headers },
    prefix: "/api/docs",
  });

  return matched ? c.newResponse(response.body, response) : await next();
});
