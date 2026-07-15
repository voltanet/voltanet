import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { signInSchema } from "@repo/shared/validation";
import { Iconify } from "@/components/iconify";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNotify } from "@/hooks/use-notify";
import { auth } from "../index";

export const LoginForm = () => {
  const notify = useNotify();

  const { form, isPending, error } = useFormMutation({
    initialValues: { email: "", password: "" },
    schema: signInSchema,
    mutationFn: async (values) => {
      const { error } = await auth.signIn.email(values);
      if (error) throw error;
      notify.success("Signed in successfully");
    },
  });

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
          leftSection={<Iconify width={20} icon="@vite:solar:letter-bold" />}
          {...form.getInputProps("email")}
          key={form.key("email")}
          size="lg"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          leftSection={<Iconify width={20} icon="@vite:solar:lock-password-bold" />}
          {...form.getInputProps("password")}
          key={form.key("password")}
          size="lg"
        />
        <Button type="submit" variant="filled" size="md" loading={isPending} fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  );
};
