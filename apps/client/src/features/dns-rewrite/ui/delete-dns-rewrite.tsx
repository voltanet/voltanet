import { Alert, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteDNSRewrite } from "../hooks";

export type $DeleteDNSRewrite = { children?: React.ReactNode; id: string };

export const DeleteDNSRewrite = ({ children, id }: $DeleteDNSRewrite) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { error, isPending, mutate } = useDeleteDNSRewrite();

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Modal opened={opened} onClose={close} title="Delete DNS Rewrite">
        <Stack>
          {error && (
            <Alert title="Error" color="red">
              {error.message}
            </Alert>
          )}
          <Text>Are you sure you want to delete this DNS rewrite?</Text>
          <Group justify="flex-end" gap={15}>
            <Button onClick={close}>Cancel</Button>
            <Button
              onClick={() => void mutate({ id })}
              loading={isPending}
              variant="filled"
              color="red"
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
