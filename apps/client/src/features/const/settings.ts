export type SettingsLink = (typeof SETTINGS_LINKS.main)[number];

export const SETTINGS_LINKS = {
  main: [
    {
      label: "Appearance",
      description: "App interface and customization",
      icon: "solar:laptop-minimalistic-bold",
      path: "/settings/appearance",
    },
    {
      label: "Account",
      description: "Account and profile management",
      icon: "solar:user-bold",
      path: "/settings/account",
    },
    {
      label: "Security",
      description: "Security and session management",
      icon: "solar:shield-bold",
      path: "/settings/security",
    },
  ],
  about: [
    {
      label: "Documentation",
      description: "Documentation for the application",
      icon: "solar:book-bold",
      path: "https://voltanet.github.io",
      target: "_blank",
    },
    {
      label: "Source Code",
      description: "Source code and repository",
      icon: "solar:code-bold",
      path: "https://github.com/voltanet/voltanet",
      target: "_blank",
    },
    {
      label: "About",
      description: "About the application",
      icon: "solar:info-circle-bold",
      path: "/about",
    },
  ],
};
