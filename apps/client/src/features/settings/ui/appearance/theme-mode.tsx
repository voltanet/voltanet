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
  { value: "auto", label: "Auto", icon: "solar:mirror-left-bold" },
  { value: "dark", label: "Dark", icon: "solar:moon-bold" },
  { value: "light", label: "Light", icon: "solar:sun-2-bold" },
].map(({ label, value, icon }) => ({
  value,
  label: (
    <Stack p={10} justify="center" align="center" key={label}>
      <Iconify width={40} icon={icon} />
      <Text>{label}</Text>
    </Stack>
  ),
}));
