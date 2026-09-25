import { Box, Button, EmptyState, Select } from "@mantine/core";
import { type UseUncontrolledOptions, useUncontrolled } from "@mantine/hooks";
import { useRef } from "react";
import { Iconify } from "@/components/iconify";
import { useCertificates } from "../hooks";
import { CreateCertificate } from "./create-certificate";

export type $CertificatePicker = UseUncontrolledOptions<string | null> & { enabled?: boolean };

export const CertificatePicker = ({ enabled, ...options }: $CertificatePicker) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useUncontrolled(options);
  const { error, data, isLoading } = useCertificates(enabled);

  const items = data?.items.map(({ id, name }) => ({ value: id, label: name }));

  const emptyState = (
    <Box py={30}>
      <EmptyState
        title="No certificates found"
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
      <CreateCertificate ref={ref} />
      <Select
        label="Certificate"
        placeholder="Choose certificate"
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
