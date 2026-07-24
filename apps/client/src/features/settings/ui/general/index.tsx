import { Card, Stack, Text, useComputedColorScheme } from "@mantine/core";
import { AmoledDark } from "./amoled-dark";
import { AutoContrast } from "./auto-contrast";
import { DisplaySize } from "./display-size";
import { TextStyle } from "./text-style";
import { ThemeMode } from "./theme-mode";

export { AmoledDarkLoader } from "./amoled-dark";
export { TextStyleLoader } from "./text-style";

export const GeneralSettings = () => {
  const scheme = useComputedColorScheme();

  return (
    <Stack>
      <Card component={Stack} gap={5}>
        <Text>Theme Mode</Text>
        <Text c="dimmed">Select the theme mode for your application</Text>
        <ThemeMode />
        <Stack mt={15}>
          {scheme === "dark" && <AmoledDark />}
          <AutoContrast />
        </Stack>
      </Card>
      <Card component={Stack} gap={5}>
        <Text>Text Style</Text>
        <Text c="dimmed">Select the text style for your application</Text>
        <TextStyle />
      </Card>
      <Card component={Stack} gap={5}>
        <Text>Display Size</Text>
        <Text c="dimmed">Select the display size for your application</Text>
        <DisplaySize />
      </Card>
    </Stack>
  );
};
