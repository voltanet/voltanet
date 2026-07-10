import type { Context } from "hono";
import { getIcons } from "@/utils/icons" with { type: "macro" };

const { collection, size } = getIcons();

export const icons = async (c: Context<any, "/:prefix">) => {
  // get icons names
  const query = c.req.query("icons");
  const names = query ? query.split(",") : [];

  // get collection name - switch control for multiple collections
  const prefix = c.req.param("prefix").split(".")[0];

  // collect icons contents
  const contents = names.map((name) => ({ [name]: collection[name] }));

  // resolve the result
  return c.json({
    icons: Object.assign({}, ...contents),
    height: size,
    width: size,
    prefix,
  });
};
