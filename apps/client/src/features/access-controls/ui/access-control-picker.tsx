import { Box, Button, EmptyState, Select } from "@mantine/core";
import { type UseUncontrolledOptions, useUncontrolled } from "@mantine/hooks";
import { useRef } from "react";
import { Iconify } from "@/components/iconify";
import { useAccessControls } from "../hooks";
import { CreateAccessControl } from "./create-access-control";

export type $AccessControlPicker = UseUncontrolledOptions<string | null> & { enabled?: boolean };

export const AccessControlPicker = ({ enabled, ...options }: $AccessControlPicker) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useUncontrolled(options);
  const { error, data, isLoading } = useAccessControls(enabled);

  const items = data?.items.map(({ id, name }) => ({ value: id, label: name }));

  const emptyState = (
    <Box py={30}>
      <EmptyState
        title="No access controls found"
        icon={<Iconify icon="@vite:iconamoon:box-light" />}
        variant="light"
      >
        <Button variant="filled" onClick={() => ref.current?.click()}>
          Create New
        </Button>
      </EmptyState>
    </Box>
  );

  return (
    <div>
      <CreateAccessControl ref={ref} />
      <Select
        label="Access Control"
        placeholder="Choose access control"
        onChange={(value) => setValue(value)}
        nothingFoundMessage={emptyState}
        error={error?.message}
        loading={isLoading}
        value={value}
        allowDeselect
        data={items}
        searchable
      />
    </div>
  );
};
