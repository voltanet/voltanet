import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $UpdateBlockListSchema, updateBlockListSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export type $UseUpdateBlockList = $UpdateBlockListSchema;

export const useUpdateBlockList = (initialValues: $UseUpdateBlockList) => {
  const notify = useNotify();

  const form = useForm<$UpdateBlockListSchema>({
    validate: zod4Resolver(updateBlockListSchema),
    initialValues,
  });

  const mutation = useMutation({
    mutationFn: async (values: $UpdateBlockListSchema, { client }) => {
      const [error, result] = await api.blockList.update(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["block-lists"] });
        notify.success(result);
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
