import { ActionIcon, type MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { Iconify } from "./iconify";

export const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const schemes = [
    ["Auto", "@vite:radix-icons:half-2"],
    ["Dark", "@vite:tabler:moon"],
    ["Light", "@vite:tabler:sun"],
  ].map(([title, icon]) => ({
    icon: <Iconify height={20} icon={icon} />,
    value: title.toLowerCase() as MantineColorScheme,
    title,
  }));

  const curentScheme = schemes.find((item) => item.value === colorScheme);
  const currentIndex = schemes.indexOf(curentScheme as (typeof schemes)[0]);

  return (
    <ActionIcon size="lg" onClick={() => setColorScheme(schemes[(currentIndex + 1) % 3].value)}>
      {curentScheme?.icon}
    </ActionIcon>
  );
};
