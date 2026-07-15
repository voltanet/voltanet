import { useComputedColorScheme } from "@mantine/core";
import { useEffect } from "react";
import type { Manifest } from "./manifest-types";

export const withManifest = (manifest: Manifest) => manifest;
export const withPath = (src: string) => {
  return new URL(src, import.meta.url).href;
};

export const useDynamicPWA = (manifest: Manifest) => {
  const color = useComputedColorScheme() === "dark" ? "#242424" : "#ffffff";

  useEffect(() => {
    manifest.theme_color = color;
    manifest.background_color = color;
    const blob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
    const blobURL = URL.createObjectURL(blob);
    const link = document.head.querySelector<HTMLLinkElement>("[rel='manifest']");
    if (link) link.href = blobURL;
    return () => URL.revokeObjectURL(blobURL);
  }, [manifest, color]);
};
