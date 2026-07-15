/// <reference types="bun" />
import { join } from "node:path";
import { createFilter, type Plugin } from "vite";

type IconEntry = { body: string; width: number; height: number };

const API = "https://api.iconify.design";
const VID = "virtual:iconify";
const RID = `\0${VID}`;

export const iconify = (): Plugin => {
  let inflight: Promise<Record<string, IconEntry>> | null = null;
  const ids = new Set<string>();
  let root = "";

  return {
    name: "iconify",
    enforce: "pre",
    resolveId: (id) => (id === VID ? RID : undefined),
    configResolved(config) {
      root = config.root;
    },
    async buildStart() {
      ids.clear();
      const src = join(root, "src");
      const glob = new Bun.Glob("**/*.{ts,tsx}");
      for await (const path of glob.scan({ cwd: src, onlyFiles: true })) {
        const code = await Bun.file(join(src, path)).text();
        collect(ids, code);
      }
    },
    transform: (code, id) => {
      if (!isSource(id)) return;
      collect(ids, code);
    },
    async load(id) {
      if (id !== RID) return;
      const path = join(root, "node_modules/.cache/iconify/cache.json");
      inflight ??= resolve(path, ids).finally(() => {
        inflight = null;
      });
      const cache = await inflight;
      return `export const icons = ${JSON.stringify(cache)};`;
    },

    async handleHotUpdate({ file, read, server, modules }) {
      if (!isSource(file)) return;
      collect(ids, await read());

      const mod = server.moduleGraph.getModuleById(RID);
      if (!mod) return;
      server.moduleGraph.invalidateModule(mod);

      return [...modules, mod];
    },
  };
};

const isSource = createFilter(/\/src\/.*\.[cm]?[jt]sx?$/);

const collect = (ids: Set<string>, code: string) => {
  for (const m of code.matchAll(/@vite:([\w-]+):([\w-]+)/g)) ids.add(m[0]);
};

const resolve = async (fileName: string, ids: Set<string>) => {
  const file = Bun.file(fileName);
  const cache: Record<string, IconEntry> = (await file.exists()) ? await file.json() : {};
  const pending = new Map<string, string[]>();

  // Group missing icons
  for (const id of ids) {
    if (cache[id]) continue;
    const parsed = id.match(/^@vite:([\w-]+):([\w-]+)$/);
    if (!parsed) continue;
    const [, prefix, name] = parsed;
    const list = pending.get(prefix) ?? [];
    pending.set(prefix, list);
    list.push(name);
  }

  // fetch missing icons - parallel
  await Promise.all(
    [...pending].map(async ([prefix, names]) => {
      const res = await fetch(`${API}/${prefix}.json?icons=${names.sort().join(",")}`);
      if (!res.ok) throw new Error(`Iconify API error for ${prefix}: ${res.status}`);
      const { icons, width = 24, height = 24 } = await res.json();
      for (const name of names) {
        if (!icons[name]?.body) throw new Error(`Missing @vite:${prefix}:${name}`);
        cache[`@vite:${prefix}:${name}`] = { body: icons[name].body, width, height };
      }
    }),
  );

  if (pending.size) await Bun.write(fileName, JSON.stringify(cache));

  return cache;
};
