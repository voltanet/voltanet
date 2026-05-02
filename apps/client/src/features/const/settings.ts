import type { Page } from "./pages";

export const SETTINGS_PAGES = {
  Dashboard: [{ to: "/", label: "Home", icon: "solar:home-smile-bold" }],
  Settings: [
    { to: "/settings", label: "Appearance", icon: "solar:laptop-minimalistic-bold" },
    { to: "/settings/account", label: "Account", icon: "solar:user-bold" },
    { to: "/settings/security", label: "Security", icon: "solar:shield-bold" },
  ],
} as const satisfies Record<string, Page[]>;
