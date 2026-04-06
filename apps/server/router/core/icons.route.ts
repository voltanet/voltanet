import type { Context } from "hono";
import { getIcons } from "@/utils/icons" with { type: "macro" };

const { list, info } = getIcons();

const size = Array.isArray(info.height) ? info.height[0] : info.height;

export const icons = async (c: Context<any, "/:prefix">) => {
  // get icons names
  const iconsParam = c.req.query("icons");
  const names = iconsParam ? iconsParam.split(",") : [];

  // get collection name
  const prefix = c.req.param("prefix").split(".")[0];

  // find icons contents
  const contents = names.map((name) => ({ [name]: list[name] }));

  // resolve the result
  return c.json({
    icons: Object.assign({}, ...contents),
    height: size,
    width: size,
    prefix,
  });
};
