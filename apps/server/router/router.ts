import { accessControlRouter } from "./access-control";
import { publicRoute } from "./base";
import { blockListRouter } from "./block-list";
import { certificateRouter } from "./certificate";
import { coreRouter } from "./core";
import { dnsRewriteRouter } from "./dns-rewrite";
import { dnsUpstreamRouter } from "./dns-upstream";
import { proxyHostRouter } from "./proxy-host";

// Shared router types
export type Router = typeof router;

// Base router structure
export const router = publicRoute.router({
  ...coreRouter,
  accessControl: accessControlRouter,
  blockList: blockListRouter,
  certificate: certificateRouter,
  dnsRewrite: dnsRewriteRouter,
  dnsUpstream: dnsUpstreamRouter,
  proxyHost: proxyHostRouter,
});
