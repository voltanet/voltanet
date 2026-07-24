import { Button, Card, Group, NumberInput, Pagination, Popover, Select, Text } from "@mantine/core";
import { type UseUncontrolledOptions, useUncontrolled } from "@mantine/hooks";
import { Activity, useState } from "react";
import { useControls } from "./use-controls";

export const ControlsPagination = (props: { total: number }) => {
  const state = useControls();

  const total = Math.ceil(props.total / state.limit);

  return (
    <Group justify="flex-end" gap={15}>
      <Text>Limit:</Text>
      <Select
        title="Limit"
        onChange={(limit) => state.setLimit(Number(limit ?? 20))}
        value={state.limit.toString()}
        data={["5", "10", "20", "50"]}
        w={75}
      />
      <Activity mode={total > 1 ? "visible" : "hidden"}>
        <Pagination.Root value={state.page} onChange={state.setPage} total={total} size={36}>
          <Group wrap="nowrap" gap={15}>
            <Pagination.Previous title="Previous Page" />
            <PagePopover value={state.page} onChange={state.setPage} total={total} />
            <Pagination.Next title="Next Page" />
          </Group>
        </Pagination.Root>
      </Activity>
    </Group>
  );
};

const PagePopover = ({ total, ...props }: UseUncontrolledOptions<number> & { total: number }) => {
  const [page, setPage] = useUncontrolled(props);
  const [cache, setCache] = useState(page);

  const handleNavigate = () => {
    setPage(cache > total ? total : cache);
  };

  return (
    <Popover width={225} position="top" withArrow>
      <Popover.Target>
        <Card py={6} h={36} style={{ cursor: "pointer" }} title={`Page ${page} of ${total}`}>
          {page} of {total}
        </Card>
      </Popover.Target>
      <Popover.Dropdown>
        <Group align="flex-end">
          <NumberInput
            label="Go to page"
            onChange={(value) => setCache(Number(value ?? 1))}
            value={cache > total ? total : cache}
            max={total}
            flex={1}
            min={1}
          />
          <Button variant="filled" onClick={handleNavigate}>
            Go
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
