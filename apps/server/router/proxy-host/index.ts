import { createHostRoute } from "./create-host.route";
import { deleteHostRoute } from "./delete-host.route";
import { listHostRoute } from "./list-host.route";
import { updateHostRoute } from "./update-host.route";

export const proxyHostRouter = {
  create: createHostRoute,
  delete: deleteHostRoute,
  list: listHostRoute,
  update: updateHostRoute,
};
