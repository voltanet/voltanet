import { Alert, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteAccessControl } from "../hooks";

export type $DeleteAccessControl = { children?: React.ReactNode; id: string };

export const DeleteAccessControl = ({ children, id }: $DeleteAccessControl) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { error, isPending, mutate } = useDeleteAccessControl(id);

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Modal opened={opened} onClose={close} title="Delete Access Control">
        <Stack>
          {error && (
            <Alert title="Error" color="red">
              {error.message}
            </Alert>
          )}
          <Text>Are you sure you want to delete this access control?</Text>
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
