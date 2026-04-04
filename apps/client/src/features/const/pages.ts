export type Page = {
  label: string;
  to: string;
  icon: string;
  color?: string;
  list?: Page[];
};

export const PAGES: Record<string, Page[]> = {
  // ========== Dashboard ==========
  Dashboard: [{ to: "/", label: "Home", icon: "solar:home-smile-outline" }],
  // ========== Proxy ==========
  "Reverse Proxy": [
    { to: "/proxy-hosts", label: "Proxy Hosts", color: "blue", icon: "solar:global-outline" },
    {
      to: "/access-control",
      label: "Access Control",
      color: "green",
      icon: "solar:shield-user-outline",
    },
    {
      to: "/certificates",
      label: "Certificates",
      color: "yellow",
      icon: "solar:book-bookmark-outline",
    },
  ],
  // ========== DNS ==========
  "DNS Management": [
    { to: "/dns-rewrites", label: "DNS Rewrites", color: "red", icon: "solar:route-outline" },
    {
      to: "/dns-upstreams",
      label: "DNS Upstreams",
      color: "teal",
      icon: "solar:cloud-upload-outline",
    },
    {
      to: "/block-lists",
      label: "Block Lists",
      color: "indigo",
      icon: "solar:shield-cross-outline",
    },
  ],
};
