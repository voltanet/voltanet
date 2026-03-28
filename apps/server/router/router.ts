import { publicRoute } from "./base";
import { coreRouter } from "./core";
import { dnsRouter } from "./dns";
import { proxyRouter } from "./proxy";

// Shared router types
export type Router = typeof router;

// Base router structure
export const router = publicRoute.router({
  ...coreRouter,
  dns: dnsRouter,
  proxy: proxyRouter,
});
