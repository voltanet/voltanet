import { Button, Card, Group, NumberInput, Pagination, Popover, Select } from "@mantine/core";
import { Activity, useEffect, useState } from "react";
import { useControls } from "./use-controls";

export const ControlsPagination = (props: { total: number }) => {
  const [{ page, limit }, setControls] = useControls();
  const setPage = (page: number) => setControls((prev) => ({ ...prev, page }));

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on change
  useEffect(() => setPage(1), [props.total, limit]);

  const total = Math.ceil(props.total / limit);

  return (
    <Group justify="flex-end" gap={15}>
      <Select
        title="Limit"
        allowDeselect={false}
        checkIconPosition="right"
        onChange={(limit) => setControls((prev) => ({ ...prev, limit: Number(limit ?? 20) }))}
        data={["5", "10", "20", "50"]}
        defaultValue="20"
        w={75}
      />
      <Activity mode={total > 1 ? "visible" : "hidden"}>
        <Pagination.Root value={page} onChange={setPage} total={total} size={36}>
          <Group wrap="nowrap" gap={15}>
            <Pagination.Previous />
            <PageDetails total={total} />
            <Pagination.Next />
          </Group>
        </Pagination.Root>
      </Activity>
    </Group>
  );
};

const PageDetails = ({ total }: { total: number }) => {
  const [controls, setControls] = useControls();
  const [page, setPage] = useState(controls.page);

  useEffect(() => setPage(controls.page), [controls.page]);

  const handleNavigate = () => {
    if (page < 1 || page > total) return;
    setControls((prev) => ({ ...prev, page }));
  };

  return (
    <Popover width={225} position="top-end" arrowPosition="center" withArrow>
      <Popover.Target>
        <Card py={6} h={36} style={{ cursor: "pointer" }}>
          {controls.page} of {total}
        </Card>
      </Popover.Target>
      <Popover.Dropdown>
        <Group align="flex-end">
          <NumberInput
            label="Go to page"
            onChange={(value) => setPage(Number(value ?? 1))}
            value={page}
            max={total}
            flex={1}
            min={1}
          />
          <Button onClick={handleNavigate} variant="filled">
            Go
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
