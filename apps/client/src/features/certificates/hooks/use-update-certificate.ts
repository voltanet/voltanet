import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $UpdateCertificateSchema, updateCertificateSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export const useUpdateCertificate = (initialValues: $UpdateCertificateSchema) => {
  const notify = useNotify();

  const form = useForm<$UpdateCertificateSchema>({
    validate: zod4Resolver(updateCertificateSchema),
    initialValues,
  });

  const mutation = useMutation({
    mutationFn: async (values: $UpdateCertificateSchema, { client }) => {
      const [error, result] = await api.certificate.update(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["certificates"] });
        notify.success(result);
        form.reset();
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
