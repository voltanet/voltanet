import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export const useNavBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useLocalStorage({ key: "navbar-opened", defaultValue: true });
  const { pathname } = useLocation();

  useEffect(() => {
    if (isMobile) setOpened(false);
  }, [pathname, isMobile]);

  return [opened, setOpened] as const;
};
