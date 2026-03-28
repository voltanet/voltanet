import { blockListRouter } from "./block-list";
import { rewriteRouter } from "./rewrite";
import { upstreamRouter } from "./upstream";

export const dnsRouter = {
  blockList: blockListRouter,
  rewrite: rewriteRouter,
  upstream: upstreamRouter,
};
