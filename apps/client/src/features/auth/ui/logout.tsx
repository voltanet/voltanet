import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { auth } from "../client";

export const Logout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Box children={children} onClick={open} />
      <Modal opened={opened} onClose={close} title="Confirm">
        <Text mb={20}>Are you sure you want to logout?</Text>
        <Group justify="flex-end">
          <Button onClick={close}>Cancel</Button>
          <Button variant="filled" color="red" onClick={() => auth.signOut()}>
            Logout
          </Button>
        </Group>
      </Modal>
    </>
  );
};
