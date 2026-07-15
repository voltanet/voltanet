import type { Page } from "./pages";

export const SETTINGS_PAGES = {
  Dashboard: [{ to: "/", label: "Home", icon: "@vite:solar:home-smile-bold" }],
  Settings: [
    { to: "/settings", label: "General", icon: "@vite:solar:laptop-minimalistic-bold" },
    { to: "/settings/account", label: "Account", icon: "@vite:solar:user-bold" },
    { to: "/settings/security", label: "Security", icon: "@vite:solar:shield-bold" },
  ],
} as const satisfies Record<string, Page[]>;
