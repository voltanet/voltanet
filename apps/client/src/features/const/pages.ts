export type Page = {
  label: string;
  to: string;
  icon: string;
  color?: string;
  list?: Page[];
  hideFrom?: "nav" | "home";
};

export const PAGES = {
  // ========== Dashboard ==========
  Dashboard: [
    {
      to: "/",
      label: "Home",
      color: "teal",
      icon: "@vite:solar:home-smile-bold",
      hideFrom: "home",
    },
    { to: "/logs", label: "Activity Logs", color: "violet", icon: "@vite:solar:history-bold" },
  ],
  // ========== Proxy ==========
  "Reverse Proxy": [
    { to: "/proxy-hosts", label: "Proxy Hosts", color: "red", icon: "@vite:solar:global-bold" },
    {
      to: "/access-control",
      label: "Access Control",
      color: "green",
      icon: "@vite:solar:shield-user-bold",
    },
    {
      to: "/certificates",
      label: "Certificates",
      color: "yellow",
      icon: "@vite:solar:book-bookmark-bold",
    },
  ],
  // ========== DNS ==========
  "DNS Management": [
    { to: "/dns-rewrites", label: "DNS Rewrites", color: "cyan", icon: "@vite:solar:route-bold" },
    {
      to: "/dns-upstreams",
      label: "DNS Upstreams",
      color: "orange",
      icon: "@vite:solar:cloud-upload-bold",
    },
    {
      to: "/block-lists",
      label: "Block Lists",
      color: "teal",
      icon: "@vite:solar:shield-cross-bold",
    },
  ],
} as const satisfies Record<string, Page[]>;

type PageEntry = (typeof PAGES)[keyof typeof PAGES][number];

export const PAGES_FLAT = Object.values(PAGES).flat() as PageEntry[];
export const getPage = <T extends PageEntry["to"]>(to: T) => {
  return PAGES_FLAT.find((page) => page.to === to) as Extract<PageEntry, { to: T }>;
};
