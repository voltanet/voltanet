import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $UpdateRewriteSchema, updateRewriteSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export type $UseUpdateDNSRewrite = $UpdateRewriteSchema;

export const useUpdateDNSRewrite = (initialValues: $UseUpdateDNSRewrite) => {
  const notify = useNotify();

  const form = useForm<$UpdateRewriteSchema>({
    validate: zod4Resolver(updateRewriteSchema),
    initialValues,
  });

  const mutation = useMutation({
    mutationFn: async (values: $UpdateRewriteSchema, { client }) => {
      const [error, result] = await api.dnsRewrite.update(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["dns-rewrites"] });
        notify.success(result);
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
