import { icons, info } from "@iconify-json/solar";

export function getIcons(): { list: typeof icons.icons; info: typeof info } {
  const list: typeof icons.icons = {};

  for (const icon in icons.icons) {
    if (icon.endsWith("-bold")) {
      // biome-ignore lint/style/noNonNullAssertion: icon is guaranteed to be defined
      list[icon] = icons.icons[icon]!;
    }
  }

  return { list, info };
}
