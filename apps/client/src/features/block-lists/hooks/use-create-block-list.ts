import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $CreateBlockListSchema, createBlockListSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export const useCreateBlockList = () => {
  const notify = useNotify();

  const form = useForm<$CreateBlockListSchema>({
    validate: zod4Resolver(createBlockListSchema),
    initialValues: {
      name: "",
      enabled: true,
      type: "text",
      value: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: $CreateBlockListSchema, { client }) => {
      const [error, result] = await api.blockList.create(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["block-lists"] });
        notify.success(result);
        form.reset();
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
