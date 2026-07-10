import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export const useNavBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useLocalStorage({ key: "navbar-opened", defaultValue: true });
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: auto close navbar on mobile
  useEffect(() => {
    if (isMobile) setOpened(false);
  }, [pathname, isMobile, setOpened]);

  return [opened, setOpened] as const;
};
