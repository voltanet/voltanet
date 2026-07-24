import { Alert, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteCertificate } from "../hooks";

export type $DeleteCertificate = { children?: React.ReactNode; id: string };

export const DeleteCertificate = ({ children, id }: $DeleteCertificate) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { error, isPending, mutate } = useDeleteCertificate(id);

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Modal opened={opened} onClose={close} title="Delete Certificate">
        <Stack>
          {error && (
            <Alert title="Error" color="red">
              {error.message}
            </Alert>
          )}
          <Text>Are you sure you want to delete this certificate?</Text>
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
