import { Badge, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { Providers } from "../providers";

export const NotFoundOverlay = () => {
  const navigate = useNavigate();

  return (
    <Providers>
      <Center h="100%">
        <Stack align="center" ta="center" pb={60}>
          <Badge variant="light" size="xl">
            404
          </Badge>
          <Title order={2}>Page not found</Title>
          <Text c="dimmed">
            The page you're looking for doesn't exist or has been moved to a different location.
          </Text>
          <Group>
            <Button variant="filled" onClick={() => navigate({ to: "/" })}>
              Go Home
            </Button>
            <Button variant="filled" onClick={() => history.back()}>
              Go Back
            </Button>
          </Group>
        </Stack>
      </Center>
    </Providers>
  );
};
