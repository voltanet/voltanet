import { Select } from "@mantine/core";
import { useFontFamily } from "@/features/settings";

export const TextStyleLoader = () => {
  const [value] = useFontFamily();
  const font = value.replace(" ", "-").toLowerCase();

  return <link rel="stylesheet" href={`/fonts/${font}/style.css`} />;
};

export const TextStyle = () => {
  const [value, setValue] = useFontFamily();

  return (
    <Select
      variant="filled"
      onChange={(value) => setValue(value || "Roboto")}
      value={value}
      data={[
        { value: "Roboto", label: "Roboto - Normal" },
        { value: "Comic Neue", label: "Comic Neue - Thin" },
        { value: "Kalam", label: "Kalam - Cursive" },
        { value: "Sansita", label: "Sansita - Anime" },
        { value: "Fira Code", label: "Fira Code - Mono" },
      ]}
    />
  );
};
