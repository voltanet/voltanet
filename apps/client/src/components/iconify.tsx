import { icons } from "virtual:iconify";
import { Icon, type IconifyIcon, type IconProps } from "@iconify/react";

export type $Iconify = IconProps & { icon: string };

export const Iconify = ({ icon, width = 20, height, ...props }: $Iconify) => {
  const data = icons[icon] as IconifyIcon | undefined;
  if (!data) throw new Error(`Missing bundled icon: ${icon}`);
  return <Icon {...props} width={width} height={height} icon={data} />;
};
