import type { $PaginationSchema } from "@repo/shared/validation";
import { useLocation } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const defaults: $PaginationSchema = { sort: "updatedAt", direction: "desc", limit: 20, page: 1 };
const store = atom(defaults);

export const useControls = () => {
  const [controls, setControls] = useAtom(store);
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on navigation
  useEffect(() => setControls(defaults), [pathname, setControls]);

  return [controls, setControls] as const;
};
