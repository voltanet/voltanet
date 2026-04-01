import icon192 from "@/assets/images/logo-192.png";
import icon512 from "@/assets/images/logo-512.png";
import { withManifest, withPath } from "@/hooks/use-dynamic-pwa";
import { CONFIG } from "./config";

// customize it with your own names, description, icons. (use it carefully)
export const MANIFEST = withManifest({
  name: CONFIG.title,
  short_name: CONFIG.title,
  description: CONFIG.description,
  theme_color: "#ffffff",
  background_color: "#ffffff",
  start_url: withPath("/"),
  display: "standalone",
  icons: [
    { src: withPath(icon192), sizes: "192x192", type: "image/png" },
    { src: withPath(icon512), sizes: "512x512", type: "image/png" },
  ],
});
