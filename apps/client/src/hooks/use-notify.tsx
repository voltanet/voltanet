import type { DefaultMantineColor } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

export type $Notify = {
  title?: React.ReactNode;
  message: React.ReactNode;
  color?: DefaultMantineColor;
};

export const notify = ({ message, title, color }: $Notify) => {
  notifications.show({ withBorder: true, autoClose: true, message, title, color });
};

notify.success = (message: string) => {
  notify({ title: "Success", message, color: "var(--mantine-primary-color-filled)" });
};

notify.error = (message: string) => {
  notify({ title: "Error", message, color: "red" });
};

export const useNotify = () => useCallback(notify, []);
