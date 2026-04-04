import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAppTheme } from "./theme";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@/assets/styles/global.scss";

const queryClient = new QueryClient();

dayjs.extend(relativeTime);

export const Providers = ({ children }: { children?: React.ReactNode }) => {
  const theme = useAppTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <meta name="theme-color" content="var(--mantine-color-body)" />
        <DatesProvider settings={{ consistentWeeks: true }}>
          <Notifications />
          {children}
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
