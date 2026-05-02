import { Alert, Button, Card, Stack, TextInput } from "@mantine/core";
import { updateDetailsSchema } from "@repo/validation";
import { Iconify } from "@/components/iconify";
import { auth } from "@/features/auth";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNotify } from "@/hooks/use-notify";
import { AvatarPicker } from "./avatar-picker";

export const AccountDetails = () => {
  const notify = useNotify();
  const { data: session } = auth.useSession();
  if (!session) return null;

  const { form, isPending, error } = useFormMutation({
    initialValues: {
      image: session.user.image,
      name: session.user.name,
      // email: session.user.email,
    },
    schema: updateDetailsSchema,
    mutationFn: async (values) => {
      const { error } = await auth.updateUser(values);
      if (error) throw new Error(error.message);
      notify.success("Account updated successfully");
    },
  });

  return (
    <form onSubmit={form.onSubmit}>
      <Stack>
        <Card component={Stack}>
          {error && <Alert title="Error !" color="red" children={error?.message} />}
          <AvatarPicker
            name={session.user.name}
            {...form.getInputProps("image")}
            key={form.key("image")}
          />
          <TextInput
            label="Name"
            placeholder="Enter your full name"
            leftSection={<Iconify icon="solar:user-bold" />}
            {...form.getInputProps("name")}
            key={form.key("name")}
            variant="filled"
          />
          <TextInput
            label="Email Address"
            leftSection={<Iconify width={20} icon="solar:letter-bold" />}
            value={session.user.email}
            disabled
          />
        </Card>
        <Button type="submit" loading={isPending} variant="filled">
          Save Changes
        </Button>
      </Stack>
    </form>
  );
};
