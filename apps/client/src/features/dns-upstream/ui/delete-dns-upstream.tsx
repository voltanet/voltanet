import { Alert, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteDNSUpstream } from "../hooks";

export type $DeleteDNSUpstream = { children?: React.ReactNode; id: string };

export const DeleteDNSUpstream = ({ children, id }: $DeleteDNSUpstream) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { error, isPending, mutate } = useDeleteDNSUpstream(id);

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Modal opened={opened} onClose={close} title="Delete DNS Upstream">
        <Stack>
          {error && (
            <Alert title="Error" color="red">
              {error.message}
            </Alert>
          )}
          <Text>Are you sure you want to delete this DNS upstream?</Text>
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
