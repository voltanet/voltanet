import {
  ActionIcon,
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  EmptyState,
  Group,
  NumberInput,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Iconify } from "@/components/iconify";
import { DNS_UPSTREAMS } from "@/features/const";
import { useCreateDNSUpstream } from "../hooks";

export type $CreateDNSUpstream = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
};

export const CreateDNSUpstream = ({ children, ref }: $CreateDNSUpstream) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, error, isPending } = useCreateDNSUpstream();

  const addServer = () => form.insertListItem("servers", { server: "", port: 53 });

  return (
    <>
      <Box onClick={open} ref={ref}>
        {children}
      </Box>
      <Drawer opened={opened} onClose={close} title="Create DNS Upstream">
        <form onSubmit={form.onSubmit}>
          <Stack>
            {error && (
              <Alert title="Error" color="red">
                {error.message}
              </Alert>
            )}
            <TextInput
              label="Name"
              placeholder="Enter DNS upstream name"
              {...form.getInputProps("name")}
              key={form.key("name")}
              withAsterisk
            />
            <Divider />
            <Stack>
              <Group gap={10} wrap="nowrap" justify="space-between">
                <div>
                  <Text size="sm">
                    Upstream Servers{" "}
                    <Text c="var(--mantine-color-error)" span>
                      *
                    </Text>
                  </Text>
                  <Text size="xs" c="dimmed">
                    A set of DNS servers to resolve custom domains.
                  </Text>
                  {form.errors.servers && (
                    <Text size="xs" c="var(--mantine-color-error)">
                      {form.errors.servers}
                    </Text>
                  )}
                </div>
                <ActionIcon variant="default" onClick={addServer}>
                  <Iconify icon="@vite:tabler:plus" />
                </ActionIcon>
              </Group>
              {form.getValues().servers?.length === 0 && (
                <Card>
                  <EmptyState
                    title="No Servers Added"
                    description="Add a server to resolve your custom domains."
                    icon={<Iconify icon="@vite:iconamoon:box-light" />}
                    variant="light"
                  />
                </Card>
              )}
              {form.getValues().servers?.map((_, index) => (
                <Stack key={index}>
                  <Group gap={10} align="flex-start">
                    <Autocomplete
                      placeholder="Server"
                      {...form.getInputProps(`servers.${index}.server`)}
                      key={form.key(`servers.${index}.server`)}
                      data={DNS_UPSTREAMS}
                      withAsterisk
                      flex={1}
                    />
                    <NumberInput
                      placeholder="Port"
                      {...form.getInputProps(`servers.${index}.port`)}
                      key={form.key(`servers.${index}.port`)}
                      withAsterisk
                      w={100}
                    />
                    <ActionIcon onClick={() => form.removeListItem("servers", index)} color="red">
                      <Iconify icon="@vite:solar:trash-bin-trash-bold" />
                    </ActionIcon>
                  </Group>
                </Stack>
              ))}
            </Stack>
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
                  Create
                </Button>
              </Group>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
};
