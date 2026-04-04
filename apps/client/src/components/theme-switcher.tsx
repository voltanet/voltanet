import { ActionIcon, type MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { Iconify } from "./iconify";

export const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const schemes = [
    ["Auto", "solar:mirror-left-bold"],
    ["Dark", "solar:moon-outline"],
    ["Light", "solar:sun-2-outline"],
  ].map(([title, icon]) => ({
    icon: <Iconify height={20} icon={icon} />,
    value: title.toLowerCase() as MantineColorScheme,
    title,
  }));

  const curentScheme = schemes.find((item) => item.value == colorScheme);
  const currentIndex = schemes.indexOf(curentScheme as (typeof schemes)[0]);

  return (
    <ActionIcon
      onClick={() => setColorScheme(schemes[(currentIndex + 1) % 3].value)}
      children={curentScheme?.icon}
      size="lg"
    />
  );
};
