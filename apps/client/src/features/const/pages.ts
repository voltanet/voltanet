export type Page = {
  label: string;
  to: string;
  icon: string;
  color?: string;
  list?: Page[];
};

export const PAGES = {
  // ========== Dashboard ==========
  Dashboard: [{ to: "/", label: "Home", color: "teal", icon: "solar:home-smile-bold" }],
  // ========== Proxy ==========
  "Reverse Proxy": [
    { to: "/proxy-hosts", label: "Proxy Hosts", color: "blue", icon: "solar:global-bold" },
    {
      to: "/access-control",
      label: "Access Control",
      color: "green",
      icon: "solar:shield-user-bold",
    },
    {
      to: "/certificates",
      label: "Certificates",
      color: "yellow",
      icon: "solar:book-bookmark-bold",
    },
  ],
  // ========== DNS ==========
  "DNS Management": [
    { to: "/dns-rewrites", label: "DNS Rewrites", color: "red", icon: "solar:route-bold" },
    {
      to: "/dns-upstreams",
      label: "DNS Upstreams",
      color: "teal",
      icon: "solar:cloud-upload-bold",
    },
    {
      to: "/block-lists",
      label: "Block Lists",
      color: "indigo",
      icon: "solar:shield-cross-bold",
    },
  ],
} as const satisfies Record<string, Page[]>;

type PageEntry = (typeof PAGES)[keyof typeof PAGES][number];

export const PAGES_FLAT = Object.values(PAGES).flat() as PageEntry[];
export const getPage = <T extends PageEntry["to"]>(to: T) => {
  return PAGES_FLAT.find((page) => page.to === to) as Extract<PageEntry, { to: T }>;
};
