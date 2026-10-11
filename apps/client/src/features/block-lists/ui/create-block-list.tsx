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
import { useCreateBlockList } from "../hooks";
import { TextareaParser } from "./textarea-parser";

export type $CreateBlockList = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
};

export const CreateBlockList = ({ children, ref }: $CreateBlockList) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, error, isPending } = useCreateBlockList();

  return (
    <>
      <Box onClick={open} ref={ref}>
        {children}
      </Box>
      <Drawer opened={opened} onClose={close} title="Create Block List">
        <form onSubmit={form.onSubmit}>
          <Stack>
            {error && (
              <Alert title="Error" color="red">
                {error.message}
              </Alert>
            )}

            <TextInput
              label="Name"
              placeholder="Enter block list name"
              {...form.getInputProps("name")}
              key={form.key("name")}
              withAsterisk
            />

            <Stack gap={3}>
              <Text size="sm">Source Type</Text>
              <SegmentedControl
                fullWidth
                data={[
                  { label: "Text", value: "text" },
                  { label: "URL", value: "url" },
                ]}
                {...form.getInputProps("type")}
                key={form.key("type")}
              />
            </Stack>

            <Divider />

            {form.values.type === "text" ? (
              <TextareaParser
                label="Block List Content"
                placeholder="Enter one value per line..."
                description="Comments and empty lines are automatically removed when parsed."
                {...form.getInputProps("value")}
                key={form.key("value")}
                withAsterisk
              />
            ) : (
              <TextInput
                label="URL"
                placeholder="https://example.com/hosts.txt"
                {...form.getInputProps("value")}
                key={form.key("value")}
                withAsterisk
              />
            )}

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
