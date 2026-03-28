import { createAccessControlRoute } from "./create-access-control.route";
import { deleteAccessControlRoute } from "./delete-access-control.route";
import { listAccessControlRoute } from "./list-access-control.route";
import { updateAccessControlRoute } from "./update-access-control.route";

export const accessControlRouter = {
  create: createAccessControlRoute,
  delete: deleteAccessControlRoute,
  list: listAccessControlRoute,
  update: updateAccessControlRoute,
};
