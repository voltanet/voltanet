import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import {
  type $CreateAccessControlSchema,
  createAccessControlSchema,
} from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export const useCreateAccessControl = () => {
  const notify = useNotify();

  const form = useForm<$CreateAccessControlSchema>({
    validate: zod4Resolver(createAccessControlSchema),
    initialValues: { name: "", rule: "allow", satisfy: "all", exceptions: [], credentials: [] },
  });

  const mutation = useMutation({
    mutationFn: async (values: $CreateAccessControlSchema, { client }) => {
      const [error, result] = await api.accessControl.create(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["access-controls"] });
        notify.success(result);
        form.reset();
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
