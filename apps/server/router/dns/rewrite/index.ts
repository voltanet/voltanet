import { createRewriteRoute } from "./create-rewrite.route";
import { deleteRewriteRoute } from "./delete-rewrite.route";
import { listRewriteRoute } from "./list-rewrite.route";
import { updateRewriteRoute } from "./update-rewrite.route";

export const rewriteRouter = {
  create: createRewriteRoute,
  delete: deleteRewriteRoute,
  list: listRewriteRoute,
  update: updateRewriteRoute,
};
