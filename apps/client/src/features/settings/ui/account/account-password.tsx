import { Alert, Button, Card, Checkbox, PasswordInput, Stack } from "@mantine/core";
import { updatePasswordSchema } from "@repo/validation";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@/features/auth";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNotify } from "@/hooks/use-notify";

export const AccountPassword = () => {
  const notify = useNotify();
  const queryClient = useQueryClient();

  const { form, isPending, error } = useFormMutation({
    initialValues: { currentPassword: "", newPassword: "", revokeOtherSessions: false },
    schema: updatePasswordSchema,
    onError: (error) => notify.error(error.message),
    mutationFn: async (values) => auth.changePassword(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      notify.success("Password updated successfully");
    },
  });

  return (
    <form onSubmit={form.onSubmit}>
      <Stack>
        <Card component={Stack}>
          {error && <Alert title="Error !" color="red" children={error.message} />}
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            {...form.getInputProps("currentPassword")}
            key={form.key("currentPassword")}
            variant="filled"
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            {...form.getInputProps("newPassword")}
            key={form.key("newPassword")}
            variant="filled"
          />
          <Checkbox
            label="Sign out from other devices"
            {...form.getInputProps("revokeOtherSessions")}
            key={form.key("revokeOtherSessions")}
            radius="sm"
          />
        </Card>
        <Button type="submit" variant="filled" loading={isPending}>
          Update Password
        </Button>
      </Stack>
    </form>
  );
};
