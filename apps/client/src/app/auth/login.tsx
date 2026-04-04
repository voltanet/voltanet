import { Center, Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth";

export const Route = createFileRoute("/auth/login")({
  component: () => {
    return (
      <Center h="calc(100vh - 40px)">
        <Stack maw={450} w="100%" p={20}>
          <Title order={2}>Welcome back</Title>
          <Text c="dimmed">Login to access the dashboard.</Text>
          <LoginForm />
        </Stack>
      </Center>
    );
  },
});
