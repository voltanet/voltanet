import { useDebouncedValue } from "@mantine/hooks";
import { useLocation } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

const sortAtom = atomWithStorage<"createdAt" | "name" | "updatedAt">("sort", "updatedAt");
const directionAtom = atomWithStorage<"asc" | "desc">("direction", "desc");
const limitAtom = atomWithStorage("limit", 10);
const searchAtom = atom("");
const pageAtom = atom(1);

export const useControls = () => {
  const { pathname } = useLocation();
  const [sort, setSort] = useAtom(sortAtom);
  const [direction, setDirection] = useAtom(directionAtom); // spammable
  const directionValue = useDebouncedValue(direction, 600);
  const [limit, setLimit] = useAtom(limitAtom);
  const [search, setSearch] = useAtom(searchAtom); // spammable
  const searchValue = useDebouncedValue(search, 600);
  const [page, setPage] = useAtom(pageAtom);

  const values = { sort, direction: directionValue, limit, search: searchValue };
  const history = JSON.stringify(values);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on navigation
  useEffect(() => setPage(1), [pathname, history]);

  return {
    ...{ sort, setSort },
    ...{ direction, setDirection },
    ...{ limit, setLimit },
    ...{ search, setSearch },
    ...{ page, setPage },
    values,
  };
};
