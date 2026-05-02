import { Stack } from "@mantine/core";
import { AccountDetails } from "./account-details";
import { AccountPassword } from "./account-password";

export const AccountSettings = () => {
  return (
    <Stack>
      <AccountDetails />
      <AccountPassword />
    </Stack>
  );
};
