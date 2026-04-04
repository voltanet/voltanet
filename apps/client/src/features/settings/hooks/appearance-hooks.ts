import { useLocalStorage } from "@mantine/hooks";

export const useAutoContrast = () => {
  return useLocalStorage({ key: "auto-contrast", defaultValue: false });
};

export const useDisplaySize = () => {
  return useLocalStorage({ key: "display-size", defaultValue: 1 });
};

export const useFontFamily = () => {
  return useLocalStorage({ key: "font-family", defaultValue: "Roboto" });
};
