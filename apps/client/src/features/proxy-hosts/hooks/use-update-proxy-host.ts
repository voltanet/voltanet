import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $UpdateProxyHostSchema, updateProxyHostSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export type $UseUpdateProxyHost = $UpdateProxyHostSchema;

export const useUpdateProxyHost = (initialValues: $UseUpdateProxyHost) => {
  const notify = useNotify();

  const form = useForm<$UpdateProxyHostSchema>({
    validate: zod4Resolver(updateProxyHostSchema),
    initialValues: { ...initialValues, config: initialValues.config ?? undefined },
  });

  const mutation = useMutation({
    mutationFn: async (values: $UpdateProxyHostSchema, { client }) => {
      const [error, result] = await api.proxyHost.update(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["proxy-hosts"] });
        notify.success(result);
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
