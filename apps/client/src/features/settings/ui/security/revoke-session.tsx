import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/features/auth";
import { useNotify } from "@/hooks/use-notify";

export const RevokeSession = ({ token }: { token: string }) => {
  const notify = useNotify();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isPending } = useMutation({
    onError: (error) => notify.error(error.message),
    mutationFn: async (_, { client }) => {
      const { error } = await auth.revokeSession({ token });
      if (error) throw error;
      client.invalidateQueries({ queryKey: ["sessions"] });
      notify.success("Session revoked successfully");
    },
  });

  return (
    <>
      <Button variant="filled" color="red" size="xs" onClick={open}>
        Revoke
      </Button>
      <Modal opened={opened} onClose={close} title="Confirm">
        <Stack>
          <Text>Are you sure you want to revoke this session?</Text>
          <Group justify="flex-end" gap={10}>
            <Button onClick={close}>Cancel</Button>
            <Button variant="filled" color="red" onClick={() => mutate()} loading={isPending}>
              Yes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
