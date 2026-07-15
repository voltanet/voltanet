/// <reference types="vite/client" />

declare module "virtual:iconify" {
  import type { IconifyIcon } from "@iconify/react";
  export const icons: Record<string, IconifyIcon>;
}
