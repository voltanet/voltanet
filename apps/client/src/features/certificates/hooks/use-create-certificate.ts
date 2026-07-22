import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $CreateCertificateSchema, createCertificateSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export const useCreateCertificate = () => {
  const notify = useNotify();

  const form = useForm<$CreateCertificateSchema>({
    validate: zod4Resolver(createCertificateSchema),
    initialValues: { name: "", cert: "", key: "", expiresAt: new Date() },
  });

  const mutation = useMutation({
    mutationFn: async (values: $CreateCertificateSchema, { client }) => {
      const [error, result] = await api.certificate.create(values);
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
