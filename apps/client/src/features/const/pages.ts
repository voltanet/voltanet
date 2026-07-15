export type Page = {
  label: string;
  to: string;
  icon: string;
  color?: string;
  list?: Page[];
};

export const PAGES = {
  // ========== Dashboard ==========
  Dashboard: [
    {
      to: "/",
      label: "Home",
      icon: "@vite:solar:home-smile-bold",
      color: "teal",
    },
    {
      to: "/activity",
      label: "Activity Logs",
      icon: "@vite:solar:history-bold",
      color: "violet",
    },
    {
      to: "/settings",
      label: "Settings",
      icon: "@vite:solar:settings-bold",
      color: "blue",
    },
  ],
  // ========== Proxy ==========
  "Reverse Proxy": [
    {
      to: "/proxy-hosts",
      label: "Proxy Hosts",
      icon: "@vite:solar:global-bold",
      color: "red",
    },
    {
      to: "/access-control",
      label: "Access Control",
      icon: "@vite:solar:shield-user-bold",
      color: "green",
    },
    {
      to: "/certificates",
      label: "Certificates",
      icon: "@vite:solar:book-bookmark-bold",
      color: "yellow",
    },
  ],
  // ========== DNS ==========
  "DNS Management": [
    {
      to: "/dns-rewrites",
      label: "DNS Rewrites",
      icon: "@vite:solar:route-bold",
      color: "cyan",
    },
    {
      to: "/dns-upstreams",
      label: "DNS Upstreams",
      icon: "@vite:solar:cloud-upload-bold",
      color: "orange",
    },
    {
      to: "/block-lists",
      label: "Block Lists",
      icon: "@vite:solar:shield-cross-bold",
      color: "teal",
    },
  ],
} as const satisfies Record<string, Page[]>;

type PageEntry = (typeof PAGES)[keyof typeof PAGES][number];

export const PAGES_FLAT = Object.values(PAGES).flat() as PageEntry[];
export const getPage = <T extends PageEntry["to"]>(to: T) => {
  return PAGES_FLAT.find((page) => page.to === to) as Extract<PageEntry, { to: T }>;
};
