import type { DefaultMantineColor } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

export type $Notify = {
  title?: React.ReactNode;
  message: React.ReactNode;
  color?: DefaultMantineColor;
};

export const useNotify = () => useCallback(Notify, []);
const Notify = ({ message, title, color }: $Notify) => {
  notifications.show({ withBorder: true, autoClose: true, message, title, color });
};

Notify.success = (message: string) => {
  Notify({ title: "Success", message, color: "var(--mantine-primary-color-filled)" });
};

Notify.error = (message: string) => {
  Notify({ title: "Error", message, color: "red" });
};
