import { Badge, Button, Center, Group, Image, Stack, Text } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/images/logo.svg";
import { CONFIG } from "@/features/const";

export const Route = createFileRoute("/about")({
  component: () => {
    const navigate = useNavigate();

    return (
      <Center h="100%">
        <Stack align="center" ta="center" pb={60}>
          <Image w={120} src={logo} alt="logo" />
          <Badge variant="light" size="xl" fz={25} p={20}>
            {CONFIG.title}
          </Badge>
          <Text>{CONFIG.description}</Text>
          <Group gap={15}>
            <Button variant="filled" onClick={() => navigate({ to: "/" })}>
              Go Home
            </Button>
            <Button variant="filled" onClick={() => history.back()}>
              Go Back
            </Button>
          </Group>
          <Text fz="sm" c="dimmed">
            Version {CONFIG.version}
          </Text>
        </Stack>
      </Center>
    );
  },
});
