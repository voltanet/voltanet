import { Alert, Box, Button, Divider, Drawer, Group, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { TextareaReader } from "@/components/textarea-reader";
import { useCreateCertificate } from "../hooks";

export const CreateCertificate = ({ children }: React.PropsWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, error, isPending } = useCreateCertificate();

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Drawer opened={opened} onClose={close} title="Create Certificate">
        <form onSubmit={form.onSubmit}>
          <Stack>
            {error && (
              <Alert title="Error" color="red">
                {error.message}
              </Alert>
            )}
            <TextInput
              label="Name"
              placeholder="Enter certificate name"
              {...form.getInputProps("name")}
              key={form.key("name")}
            />
            <DatePickerInput
              label="Expiration Date"
              placeholder="Select expiration date"
              {...form.getInputProps("expiresAt")}
              key={form.key("expiresAt")}
            />
            <Divider />
            <TextareaReader
              label="Certificate"
              placeholder="Enter certificate content"
              {...form.getInputProps("cert")}
              key={form.key("cert")}
            />
            <TextareaReader
              label="Private Key"
              placeholder="Enter private key content"
              {...form.getInputProps("key")}
              key={form.key("key")}
            />
            <Group gap={15} justify="flex-end">
              <Button onClick={() => form.reset()}>Reset</Button>
              <Button type="submit" variant="filled" loading={isPending}>
                Create
              </Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
};
