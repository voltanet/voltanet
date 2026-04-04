import { SegmentedControl, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Iconify } from "@/components/iconify";

export const ThemeMode = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      value={colorScheme}
      onChange={(v) => setColorScheme(v as any)}
      data={modes}
      fullWidth
    />
  );
};

const modes = [
  { value: "auto", label: "Auto", icon: "solar:mirror-left-outline" },
  { value: "dark", label: "Dark", icon: "solar:moon-outline" },
  { value: "light", label: "Light", icon: "solar:sun-2-outline" },
].map(({ label, value, icon }, i) => ({
  value,
  label: (
    <Stack p={10} justify="center" align="center" key={i}>
      <Iconify width={40} icon={icon} />
      <Text>{label}</Text>
    </Stack>
  ),
}));
