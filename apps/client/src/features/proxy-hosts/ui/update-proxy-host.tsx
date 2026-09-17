import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  NumberInput,
  Select,
  Stack,
  Switch,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AccessControlPicker } from "@/features/access-controls";
import { CertificatePicker } from "@/features/certificates";
import { useUpdateProxyHost } from "../hooks";
import type { $ProxyHost } from "../types";

export type $UpdateProxyHost = { children?: React.ReactNode; item: $ProxyHost };

export const UpdateProxyHost = ({ children, item }: $UpdateProxyHost) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, error, isPending } = useUpdateProxyHost(item);

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Drawer opened={opened} onClose={close} title="Update Proxy Host">
        <form onSubmit={form.onSubmit}>
          <Stack>
            {error && (
              <Alert title="Error" color="red">
                {error.message}
              </Alert>
            )}
            <TextInput
              label="Name"
              placeholder="Enter proxy host name"
              {...form.getInputProps("name")}
              key={form.key("name")}
              withAsterisk
            />
            <TagsInput
              label="Domains"
              placeholder="Press enter to add another domain"
              {...form.getInputProps("domains")}
              key={form.key("domains")}
              withAsterisk
            />
            <Group gap={10} align="flex-start">
              <Select
                label="Protocol"
                {...form.getInputProps("destination.protocol")}
                key={form.key("destination.protocol")}
                withAsterisk
                flex={1}
                data={[
                  { label: "HTTP", value: "http" },
                  { label: "HTTPS", value: "https" },
                ]}
              />
              <TextInput
                label="Hostname"
                placeholder="e.g. localhost"
                {...form.getInputProps("destination.hostname")}
                key={form.key("destination.hostname")}
                withAsterisk
                flex={2}
              />
              <NumberInput
                label="Port"
                placeholder="3000"
                {...form.getInputProps("destination.port")}
                key={form.key("destination.port")}
                allowNegative={false}
                withAsterisk
                flex={1}
                min={1}
              />
            </Group>
            <Divider />
            <CertificatePicker
              {...form.getInputProps("certificateId")}
              key={form.key("certificateId")}
              enabled={opened}
            />
            <AccessControlPicker
              {...form.getInputProps("accessControlId")}
              key={form.key("accessControlId")}
              enabled={opened}
            />
            <Divider />
            <Select
              label="Redirect Mode"
              {...form.getInputProps("redirectCode")}
              key={form.key("redirectCode")}
              placeholder="Disabled"
              allowDeselect
              data={[
                { label: "301", value: "301" },
                { label: "302", value: "302" },
                { label: "307", value: "307" },
                { label: "308", value: "308" },
              ]}
            />
            <Switch
              label="Websocket"
              description="Enable websocket for realtime support"
              {...form.getInputProps("websocket", { type: "checkbox" })}
              key={form.key("websocket")}
              radius="sm"
            />
            <Switch
              label="Force HTTPS"
              description="Redirect HTTP requests to HTTPS automaticly"
              {...form.getInputProps("forceHttps", { type: "checkbox" })}
              key={form.key("forceHttps")}
              radius="sm"
            />
            <Divider />
            <Textarea
              label="Custom Config"
              placeholder="Enter custom nginx configurations"
              {...form.getInputProps("config")}
              key={form.key("config")}
              rows={5}
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
                <Button onClick={() => form.reset()}>Reset</Button>
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
