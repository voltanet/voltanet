import { ActionIcon, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { Iconify } from "@/components/iconify";
import { ControlsPagination } from "./pagination";
import { useControls } from "./use-controls";

type $Controls = { refetch: () => Promise<void> | void; loading: boolean };

export const Controls = ({ refetch, loading }: $Controls) => {
  const state = useControls();

  const directionIcon =
    state.direction === "desc"
      ? "@vite:solar:sort-from-top-to-bottom-bold"
      : "@vite:solar:sort-from-bottom-to-top-bold";

  return (
    <Stack>
      <TextInput
        type="search"
        placeholder="Search"
        leftSection={<Iconify icon="@vite:tabler:search" />}
        onChange={(e) => state.setSearch(e.target.value)}
        value={state.search}
      />
      <Group justify="flex-end" gap={15}>
        <Text>Sort by:</Text>
        <ActionIcon.Group>
          <Select
            w={135}
            title="Sort by"
            defaultValue="updatedAt"
            checkIconPosition="right"
            styles={{ input: { borderRadius: "10px 0 0 10px" } }}
            onChange={(value) => state.setSort(value as typeof state.sort)}
            value={state.sort}
            data={[
              { value: "updatedAt", label: "Update Time" },
              { value: "createdAt", label: "Create Time" },
              { value: "name", label: "Name" },
            ]}
          />
          <ActionIcon
            title="Sort direction"
            onClick={() => state.setDirection(state.direction === "asc" ? "desc" : "asc")}
          >
            <Iconify icon={directionIcon} flip="horizontal" />
          </ActionIcon>
        </ActionIcon.Group>
        <ActionIcon title="Refresh" onClick={refetch} loading={loading}>
          <Iconify icon="@vite:solar:refresh-bold" />
        </ActionIcon>
      </Group>
    </Stack>
  );
};

Controls.Pagination = ControlsPagination;
