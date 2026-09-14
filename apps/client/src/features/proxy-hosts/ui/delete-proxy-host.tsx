import { Alert, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteProxyHost } from "../hooks";

export type $DeleteProxyHost = { children?: React.ReactNode; id: string };

export const DeleteProxyHost = ({ children, id }: $DeleteProxyHost) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { error, isPending, mutate } = useDeleteProxyHost(id);

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Modal opened={opened} onClose={close} title="Delete Proxy Host">
        <Stack>
          {error && (
            <Alert title="Error" color="red">
              {error.message}
            </Alert>
          )}
          <Text>Are you sure you want to delete this proxy host?</Text>
          <Group justify="flex-end" gap={15}>
            <Button onClick={close}>Cancel</Button>
            <Button variant="filled" color="red" onClick={() => void mutate()} loading={isPending}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
