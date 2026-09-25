import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { Iconify } from "@/components/iconify";
import { useLogin } from "../hooks";

export const LoginForm = () => {
  const { form, isPending, error } = useLogin();

  return (
    <form onSubmit={form.onSubmit}>
      <Stack>
        {error && (
          <Alert title="Error" variant="light" color="red">
            {error.message}
          </Alert>
        )}
        <TextInput
          type="email"
          label="Email"
          placeholder="Enter your email"
          leftSection={<Iconify icon="@vite:solar:letter-bold" />}
          {...form.getInputProps("email")}
          key={form.key("email")}
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          leftSection={<Iconify icon="@vite:solar:lock-password-bold" />}
          {...form.getInputProps("password")}
          key={form.key("password")}
          size="md"
        />
        <Button type="submit" variant="filled" size="md" loading={isPending} fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  );
};
