import { RPCHandler } from "@orpc/server/fetch";
import { createMiddleware } from "hono/factory";
import { router } from "./router";

export * from "./base";

// Base API routes
export const api = createMiddleware(async (c, next) => {
  const handler = new RPCHandler(router);
  const { matched, response } = await handler.handle(c.req.raw, {
    context: { headers: c.req.raw.headers },
    prefix: "/api",
  });

  return matched ? c.newResponse(response.body, response) : await next();
});
