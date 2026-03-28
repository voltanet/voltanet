import { createBlockListRoute } from "./create-block-list.route";
import { deleteBlockListRoute } from "./delete-block-list.route";
import { listBlockListRoute } from "./list-block-list.route";
import { syncBlockListRoute } from "./sync-block-list.route";
import { updateBlockListRoute } from "./update-block-list.route";

export const blockListRouter = {
  create: createBlockListRoute,
  delete: deleteBlockListRoute,
  list: listBlockListRoute,
  sync: syncBlockListRoute,
  update: updateBlockListRoute,
};
