import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import {
  type $UpdateAccessControlSchema,
  updateAccessControlSchema,
} from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export const useUpdateAccessControl = (initialValues: $UpdateAccessControlSchema) => {
  const notify = useNotify();

  const form = useForm<$UpdateAccessControlSchema>({
    validate: zod4Resolver(updateAccessControlSchema),
    initialValues,
  });

  const mutation = useMutation({
    mutationFn: async (values: $UpdateAccessControlSchema, { client }) => {
      const [error, result] = await api.accessControl.update(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["access-controls"] });
        notify.success(result);
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
