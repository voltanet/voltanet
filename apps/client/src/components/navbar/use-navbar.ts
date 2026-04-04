import { useLocation } from "@tanstack/react-router";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useEffect } from "react";

const navBarAtom = atom(false);

export const useNavBar = () => {
  const [opened, setOpened] = useAtom(navBarAtom);
  const { pathname } = useLocation();
  useEffect(() => setOpened(false), [pathname]);
  return [opened, setOpened] as const;
};
