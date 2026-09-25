import { Alert, Button, Card, Checkbox, PasswordInput, Stack } from "@mantine/core";
import { useUpdateAccountPassword } from "../../hooks";

export const AccountPassword = () => {
  const { form, isPending, error } = useUpdateAccountPassword();

  return (
    <form onSubmit={form.onSubmit}>
      <Card component={Stack}>
        {error && (
          <Alert title="Error !" color="red">
            {error.message}
          </Alert>
        )}
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
          variant="outline"
          radius="sm"
        />
        {form.isDirty() && (
          <Button variant="filled" type="submit" loading={isPending}>
            Update Password
          </Button>
        )}
      </Card>
    </form>
  );
};
