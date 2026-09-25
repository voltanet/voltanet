import { Alert, Button, Card, Stack, TextInput } from "@mantine/core";
import { Iconify } from "@/components/iconify";
import { auth } from "@/features/auth";
import { useUpdateAccountDetails } from "../../hooks";
import { AvatarPicker } from "./avatar-picker";

export const AccountDetails = () => {
  const { data: session } = auth.useSession();

  const { form, isPending, error } = useUpdateAccountDetails({
    image: session?.user.image,
    name: session?.user.name,
  });

  if (!session) return null;

  return (
    <form onSubmit={form.onSubmit}>
      <Card component={Stack}>
        {error && (
          <Alert title="Error !" color="red">
            {error?.message}
          </Alert>
        )}
        <AvatarPicker
          name={session.user.name}
          {...form.getInputProps("image")}
          key={form.key("image")}
        />
        <TextInput
          label="Name"
          placeholder="Enter your full name"
          leftSection={<Iconify icon="@vite:solar:user-bold" />}
          {...form.getInputProps("name")}
          key={form.key("name")}
          variant="filled"
        />
        <TextInput
          label="Email Address"
          leftSection={<Iconify icon="@vite:solar:letter-bold" />}
          value={session.user.email}
          disabled
        />
        {form.isDirty() && (
          <Button variant="filled" type="submit" loading={isPending}>
            Save Changes
          </Button>
        )}
      </Card>
    </form>
  );
};
