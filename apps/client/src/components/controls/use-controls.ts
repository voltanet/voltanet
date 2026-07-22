import { useDebouncedValue } from "@mantine/hooks";
import { useLocation } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

const sortAtom = atomWithStorage<"createdAt" | "name" | "updatedAt">("sort", "updatedAt");
const directionAtom = atomWithStorage<"asc" | "desc">("direction", "desc");
const limitAtom = atomWithStorage("limit", 10);
const searchAtom = atom("");
const pageAtom = atom(1);

export const useControls = () => {
  const { pathname } = useLocation();
  const [sort, setSort] = useAtom(sortAtom);
  const [direction, setDirection] = useAtom(directionAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [searchValue] = useDebouncedValue(search, 500);
  const [page, setPage] = useAtom(pageAtom);
  const [enabled, setEnabled] = useState(false);

  const values = { sort, direction, limit, search: searchValue };
  const history = JSON.stringify(values);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on navigation
  useEffect(() => setPage(1), [pathname, history]);
  useEffect(() => setEnabled(true), []); // Ensures final values

  return {
    ...{ sort, setSort },
    ...{ direction, setDirection },
    ...{ limit, setLimit },
    ...{ search, setSearch },
    ...{ page, setPage },
    enabled,
    values,
  };
};
