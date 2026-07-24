import { Switch } from "@mantine/core";
import amoledDarkStyles from "@/assets/styles/amoled.scss?url";
import { useAmoledDark } from "@/features/settings";

export const AmoledDark = () => {
  const [value, setValue] = useAmoledDark();

  return (
    <Switch
      label="Amoled Dark"
      description="Enable the Amoled dark theme for better visibility."
      onChange={() => setValue(!value)}
      checked={value}
      radius="sm"
    />
  );
};

export const AmoledDarkLoader = () => {
  const [value] = useAmoledDark();

  if (!value) return null;

  return <link rel="stylesheet" href={amoledDarkStyles} />;
};
