import { ActionIcon, Avatar, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { type UseUncontrolledOptions, useDisclosure, useUncontrolled } from "@mantine/hooks";
import { Iconify } from "@/components/iconify";

import styles from "./avatar-picker.module.scss";

type $AvatarPicker = UseUncontrolledOptions<string | null> & { name?: string };

export const AvatarPicker = ({ name, ...props }: $AvatarPicker) => {
  const [value, setValue] = useUncontrolled(props);
  const [opened, { open, close }] = useDisclosure(false);

  const avatars = Array.from({ length: 10 }, (_, i) => {
    const avatar = `/images/avatars/avatar-${++i}.png`;
    return (
      <ActionIcon size="100%" variant="light" onClick={() => (setValue(avatar), close())} key={i}>
        <Avatar size="100%" src={avatar} />
      </ActionIcon>
    );
  });

  return (
    <>
      <Group>
        <Avatar size={60} src={value} name={name} />
        <Stack gap={5}>
          <Text>Change Image</Text>
          <Button onClick={open} w="fit-content" size="xs">
            Choose
          </Button>
        </Stack>
      </Group>
      <Modal opened={opened} onClose={close} title="Change Image" keepMounted>
        <Box className={styles.avatarGrid} w="fit-content">
          <ActionIcon size="100%" variant="light" onClick={() => (setValue(null), close())}>
            <Stack gap={5} align="center">
              <Iconify width="60%" icon="solar:gallery-remove-bold" />
              <Text size="xs" c="dimmed">
                Remove
              </Text>
            </Stack>
          </ActionIcon>

          {avatars}
        </Box>
      </Modal>
    </>
  );
};
