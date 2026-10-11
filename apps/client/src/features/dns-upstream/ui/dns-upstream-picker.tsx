import { Box, Button, EmptyState, Select } from "@mantine/core";
import { type UseUncontrolledOptions, useUncontrolled } from "@mantine/hooks";
import { useRef } from "react";
import { Iconify } from "@/components/iconify";
import { useDNSUpstreams } from "../hooks";
import { CreateDNSUpstream } from "./create-dns-upstream";

export type $DNSUpstreamPicker = UseUncontrolledOptions<string | null> & { enabled?: boolean };

export const DNSUpstreamPicker = ({ enabled, ...options }: $DNSUpstreamPicker) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useUncontrolled(options);
  const { data, isLoading, error } = useDNSUpstreams(enabled);

  const items = data?.items.map(({ id, name }) => ({ value: id, label: name })) ?? [];

  const emptyState = (
    <Box py={30}>
      <EmptyState
        title="No DNS upstreams found"
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
      <CreateDNSUpstream ref={ref} />
      <Select
        label="DNS Upstream"
        placeholder="Choose a DNS upstream"
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
