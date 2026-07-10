import { icons, info } from "@iconify-json/solar";

export function getIcons(): { collection: typeof icons.icons; size: number } {
  const size = (Array.isArray(info.height) ? info.height[0] : info.height) ?? 16;

  const collection: typeof icons.icons = {};

  for (const icon in icons.icons) {
    if (icon.endsWith("-bold")) {
      collection[icon] = icons.icons[icon];
    }
  }

  return { collection, size };
}
