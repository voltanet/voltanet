import { SegmentedControl, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Iconify } from "@/components/iconify";

export const ThemeMode = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      value={colorScheme}
      onChange={(v) => setColorScheme(v as typeof colorScheme)}
      data={modes}
      fullWidth
    />
  );
};

const modes = [
  { value: "auto", label: "Auto", icon: "@vite:radix-icons:half-2" },
  { value: "dark", label: "Dark", icon: "@vite:tabler:moon" },
  { value: "light", label: "Light", icon: "@vite:tabler:sun" },
].map(({ label, value, icon }) => ({
  value,
  label: (
    <Stack p={10} justify="center" align="center" key={label}>
      <Iconify width={40} icon={icon} />
      <Text>{label}</Text>
    </Stack>
  ),
}));
