import { Badge, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { type ErrorComponentProps, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Providers } from "../providers";

export const ErrorOverlay = ({ error, reset }: ErrorComponentProps) => {
  const navigate = useNavigate();

  useEffect(() => console.error(error), [error]);

  return (
    <Providers>
      <Center h="100%">
        <Stack align="center" ta="center" pb={60}>
          <Badge variant="light" size="xl">
            OOPS
          </Badge>
          <Title order={2}>Something went wrong</Title>
          <Text c="dimmed">
            Please try again later or check the browser console for more details.
          </Text>
          <Group>
            <Button variant="filled" onClick={() => navigate({ to: "/" })}>
              Go Home
            </Button>
            <Button variant="filled" onClick={reset}>
              Try Again
            </Button>
          </Group>
        </Stack>
      </Center>
    </Providers>
  );
};
