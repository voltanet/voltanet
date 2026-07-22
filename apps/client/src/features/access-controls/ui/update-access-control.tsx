import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  Group,
  PasswordInput,
  SegmentedControl,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EmptyState } from "@/components/empty-state";
import { Iconify } from "@/components/iconify";
import { useUpdateAccessControl } from "../hooks";
import type { $AccessControl } from "../types";

export type $UpdateAccessControl = { children?: React.ReactNode; item: $AccessControl };

export const UpdateAccessControl = ({ children, item }: $UpdateAccessControl) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, error, isPending } = useUpdateAccessControl(item);

  const addCredential = () =>
    form.insertListItem("credentials", { id: crypto.randomUUID(), username: "", password: "" });

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Drawer opened={opened} onClose={close} title="Update Access Control">
        <form onSubmit={form.onSubmit}>
          <Stack>
            {error && (
              <Alert title="Error" color="red">
                {error.message}
              </Alert>
            )}
            <TextInput
              label="Name"
              placeholder="Enter access control name"
              {...form.getInputProps("name")}
              key={form.key("name")}
              withAsterisk
            />
            <Stack gap={3}>
              <Text size="sm">Access Rule</Text>
              <SegmentedControl
                {...form.getInputProps("rule")}
                key={form.key("rule")}
                fullWidth
                data={[
                  { label: "Allow", value: "allow" },
                  { label: "Deny", value: "deny" },
                ]}
              />
            </Stack>
            <Stack gap={3}>
              <Text size="sm">Satisfy</Text>
              <SegmentedControl
                {...form.getInputProps("satisfy")}
                key={form.key("satisfy")}
                fullWidth
                data={[
                  { label: "All", value: "all" },
                  { label: "Any", value: "any" },
                ]}
              />
            </Stack>
            <Divider />
            <TagsInput
              label="Exceptions"
              placeholder="Press enter to add an exception"
              description="A set of IP addresses or CIDR blocks."
              {...form.getInputProps("exceptions")}
              key={form.key("exceptions")}
            />
            <Stack>
              <Group gap={10} wrap="nowrap" justify="space-between">
                <div>
                  <Text size="sm">Credentials</Text>
                  <Text size="xs" c="dimmed">
                    A set of credentials for basic-auth.
                  </Text>
                  {form.errors.credentials && (
                    <Text size="xs" c="red">
                      {form.errors.credentials}
                    </Text>
                  )}
                </div>
                <ActionIcon variant="default" onClick={addCredential}>
                  <Iconify icon="@vite:tabler:plus" />
                </ActionIcon>
              </Group>
              {form.getValues().credentials?.length === 0 && (
                <Card>
                  <EmptyState
                    title="No Credentials Added"
                    description="Add a credentials to allow users to authenticate with basic-auth."
                    size={70}
                  />
                </Card>
              )}
              {form.getValues().credentials?.map(({ id }, index) => (
                <Stack key={id}>
                  <Group gap={10} align="flex-start">
                    <TextInput
                      placeholder="Username"
                      {...form.getInputProps(`credentials.${index}.username`)}
                      key={form.key(`credentials.${index}.username`)}
                      withAsterisk
                      flex={1}
                    />
                    <PasswordInput
                      placeholder="Password"
                      {...form.getInputProps(`credentials.${index}.password`)}
                      key={form.key(`credentials.${index}.password`)}
                      withAsterisk
                      flex={1}
                    />
                    <ActionIcon
                      onClick={() => form.removeListItem("credentials", index)}
                      color="red"
                    >
                      <Iconify icon="@vite:solar:trash-bin-trash-bold" />
                    </ActionIcon>
                  </Group>
                </Stack>
              ))}
            </Stack>
            <Group gap={15} justify="flex-end">
              <Button onClick={() => form.reset()}>Reset</Button>
              <Button type="submit" variant="filled" loading={isPending}>
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
};
