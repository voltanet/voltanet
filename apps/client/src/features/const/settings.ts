import type { Page } from "./pages";

export const SETTINGS_PAGES = {
  Settings: [
    { to: "/settings", label: "Appearance", icon: "solar:laptop-minimalistic-bold" },
    { to: "/settings/account", label: "Account", icon: "solar:user-bold" },
    { to: "/settings/security", label: "Security", icon: "solar:shield-bold" },
    { to: "/", label: "Return Home", icon: "solar:round-alt-arrow-left-bold" },
  ],
} as const satisfies Record<string, Page[]>;
