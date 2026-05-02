import { Card, Stack, Text } from "@mantine/core";
import { AutoContrast } from "./auto-contrast";
import { DisplaySize } from "./display-size";
import { TextStyle } from "./text-style";
import { ThemeMode } from "./theme-mode";

export { TextStyleLoader } from "./text-style";

export const AppearanceSettings = () => {
  return (
    <Stack>
      <Card component={Stack} gap={5}>
        <Text>Theme Mode</Text>
        <Text c="dimmed">Select the theme mode for your application</Text>
        <ThemeMode />
        <Stack h={10} />
        <AutoContrast />
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
