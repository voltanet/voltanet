import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLogout } from "../hooks";

export type $LogoutButton = { children?: React.ReactNode };

export const LogoutButton = ({ children }: $LogoutButton) => {
  const [opened, { open, close }] = useDisclosure(false);
  const logout = useLogout();

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Modal opened={opened} onClose={close} title="Confirm">
        <Text mb={20}>Are you sure you want to logout?</Text>
        <Group justify="flex-end">
          <Button onClick={close}>Cancel</Button>
          <Button variant="filled" color="red" onClick={logout}>
            Logout
          </Button>
        </Group>
      </Modal>
    </>
  );
};
