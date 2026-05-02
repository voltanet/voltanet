import path from "node:path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const mantine = path.join(process.cwd(), "src/assets/styles/_mantine");
const routerOptions = {
  routesDirectory: "./src/app",
  autoCodeSplitting: true,
  target: "react",
} as const;

export default defineConfig({
  resolve: { alias: { "@": "/src" } },
  build: { chunkSizeWarningLimit: 1000 },
  plugins: [tanstackRouter(routerOptions), react()],
  server: { host: true, port: 3000, proxy: { "/api": "http://localhost:8000" } },
  preview: { host: true, port: 8080, proxy: { "/api": "http://localhost:8000" } },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@use "${mantine.replace(/\\/g, "/")}" as mantine;` },
    },
  },
});
