import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DNSUpstreamPicker } from "@/features/dns-upstream";
import { useUpdateDNSRewrite } from "../hooks";
import type { $DNSRewrite } from "../types";

export type $UpdateDNSRewrite = { children?: React.ReactNode; item: $DNSRewrite };

export const UpdateDNSRewrite = ({ children, item }: $UpdateDNSRewrite) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, error, isPending } = useUpdateDNSRewrite(item);

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Drawer opened={opened} onClose={close} title="Update DNS Rewrite">
        <form onSubmit={form.onSubmit}>
          <Stack>
            {error && (
              <Alert title="Error" color="red">
                {error.message}
              </Alert>
            )}

            <TextInput
              label="Name"
              placeholder="Enter rewrite name"
              {...form.getInputProps("name")}
              key={form.key("name")}
              withAsterisk
            />

            <div>
              <Text size="sm" fw="bold">
                Record Type &nbsp;
                <Text c="var(--mantine-color-error)" span>
                  *
                </Text>
              </Text>
              <SegmentedControl
                {...form.getInputProps("type")}
                key={form.key("type")}
                fullWidth
                data={[
                  { label: "A", value: "A" },
                  { label: "CNAME", value: "CNAME" },
                ]}
              />
            </div>

            <TextInput
              label="Domain"
              placeholder="example.com"
              {...form.getInputProps("domain")}
              key={form.key("domain")}
              withAsterisk
            />

            <TextInput
              label="Destination"
              placeholder="internal-service.local"
              {...form.getInputProps("destination")}
              key={form.key("destination")}
              withAsterisk
            />

            <DNSUpstreamPicker
              {...form.getInputProps("upstreamId")}
              key={form.key("upstreamId")}
              enabled={opened}
            />

            <Divider />

            <Group justify="space-between">
              <Switch
                label="Enabled"
                {...form.getInputProps("enabled", { type: "checkbox" })}
                key={form.key("enabled")}
                radius="sm"
                size="md"
              />

              <Group gap={15}>
                <Button onClick={() => form.reset()} type="button">
                  Reset
                </Button>
                <Button type="submit" variant="filled" loading={isPending}>
                  Save
                </Button>
              </Group>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
};
