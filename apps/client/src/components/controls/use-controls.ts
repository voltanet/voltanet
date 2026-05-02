import type { $PaginationSchema } from "@repo/validation";
import { useLocation } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const defaults: $PaginationSchema = { sort: "updatedAt", direction: "desc", limit: 20, page: 1 };
const store = atom(defaults);

export const useControls = () => {
  const [controls, setControls] = useAtom(store);
  const { pathname } = useLocation();

  useEffect(() => setControls(defaults), [pathname]);

  return [controls, setControls] as const;
};
