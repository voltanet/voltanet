export type Page = {
  label: string;
  to: string;
  icon: string;
  color?: string;
  list?: Page[];
};

export const PAGES: Page[] = [
  // ========== Main ==========
  { to: "/", label: "Home", color: "green", icon: "solar:home-smile-outline" },
  // ========== Proxy ==========
  // ========== DNS ==========
  // ========== Extra ==========
];
