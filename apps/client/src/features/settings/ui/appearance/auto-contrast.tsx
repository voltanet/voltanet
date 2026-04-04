import { Checkbox } from "@mantine/core";
import { useAutoContrast } from "@/features/settings";

export const AutoContrast = () => {
  const [value, setValue] = useAutoContrast();

  return (
    <Checkbox
      label="Auto contrast"
      description="Enable the overall contrast and mixture of colors for better visibility."
      onChange={() => setValue(!value)}
      checked={value}
      radius="sm"
      size="md"
    />
  );
};
