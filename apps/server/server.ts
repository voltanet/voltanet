import { ORPCError } from "@orpc/server";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as router from "./router";
import { auth } from "./utils/auth";

const start = Date.now();
const isProd = process.env.NODE_ENV === "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "8090", 10);

try {
  const { fetch } = new Hono()
    .use(cors()) // Global protection
    .use(logger(isProd ? () => {} : console.log))
    .use(serveStatic({ root: "./client" })) // Serve client
    .use("/api/auth/*", (c) => auth.handler(c.req.raw))
    .use("/api/docs/*", router.docs) // API docs
    .use("/api/icons/:prefix", router.icons) // Serve icons
    .use("/api/files/*", router.files) // Serve files
    .use("/api/*", router.rpc) // RPC routes
    .notFound(async (c) => {
      const client = Bun.file("./client/index.html");
      return (await client.exists())
        ? c.html(await client.text())
        : c.json(new ORPCError("NOT_FOUND").toJSON(), 404);
    })
    .onError((error, c) => {
      console.error(error);
      return c.json(new ORPCError("INTERNAL_SERVER_ERROR").toJSON(), 500);
    });

  Bun.serve({ fetch, hostname, port });
  console.log(`Ready in ${Date.now() - start} ms`);
  console.log(`Server running at http://${hostname}:${port}`);
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));
} catch (error) {
  console.error("Error starting server: ", error);
  process.exit(1);
}
