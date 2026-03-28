import { createUpstreamRoute } from "./create-upstream.route";
import { deleteUpstreamRoute } from "./delete-upstream.route";
import { listUpstreamRoute } from "./list-upstream.route";
import { updateUpstreamRoute } from "./update-upstream.route";

export const dnsUpstreamRouter = {
  create: createUpstreamRoute,
  delete: deleteUpstreamRoute,
  list: listUpstreamRoute,
  update: updateUpstreamRoute,
};
