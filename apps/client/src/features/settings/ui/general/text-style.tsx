import { Select } from "@mantine/core";
import { useFontFamily } from "@/features/settings";

export const TextStyleLoader = () => {
  const [value] = useFontFamily();

  return (
    <link
      rel="stylesheet"
      href={`https://fonts.googleapis.com/css2?family=${value.replace(" ", "+")}:wght@400;700;900&display=swap`}
    />
  );
};

export const TextStyle = () => {
  const [value, setValue] = useFontFamily();

  return (
    <Select
      variant="filled"
      allowDeselect={false}
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
