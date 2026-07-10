import { ActionIcon, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { Iconify } from "@/components/iconify";
import { ControlsPagination } from "./pagination";
import { useControls } from "./use-controls";

type $Controls = { refetch: () => Promise<void>; loading: boolean };

export const Controls = ({ refetch, loading }: $Controls) => {
  const [{ direction, sort }, setControls] = useControls();
  const setSearch = useDebouncedCallback(
    (search: string) => setControls((prev) => ({ ...prev, search })),
    500,
  );

  const toggleDirection = () =>
    setControls((prev) => ({ ...prev, direction: prev.direction === "asc" ? "desc" : "asc" }));

  const directionIcon =
    direction === "desc"
      ? "solar:sort-from-top-to-bottom-bold"
      : "solar:sort-from-bottom-to-top-bold";

  return (
    <Stack>
      <TextInput
        type="search"
        placeholder="Search"
        leftSection={<Iconify icon="solar:filter-bold" />}
        onChange={(e) => setSearch(e.target.value)}
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
            onChange={(value) => setControls((prev) => ({ ...prev, sort: value as typeof sort }))}
            data={[
              { value: "updatedAt", label: "Update Time" },
              { value: "createdAt", label: "Create Time" },
              { value: "name", label: "Name" },
            ]}
          />
          <ActionIcon title="Sort direction" onClick={toggleDirection}>
            <Iconify width={20} icon={directionIcon} flip="horizontal" />
          </ActionIcon>
        </ActionIcon.Group>
        <ActionIcon title="Refresh" onClick={refetch} loading={loading}>
          <Iconify width={20} icon="solar:refresh-bold" />
        </ActionIcon>
      </Group>
    </Stack>
  );
};

Controls.Pagination = ControlsPagination;
