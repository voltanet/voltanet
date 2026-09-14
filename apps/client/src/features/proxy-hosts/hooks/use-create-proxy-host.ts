import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $CreateProxyHostSchema, createProxyHostSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export const useCreateProxyHost = () => {
  const notify = useNotify();

  const form = useForm<$CreateProxyHostSchema>({
    validate: zod4Resolver(createProxyHostSchema),
    initialValues: {
      name: "",
      domains: [],
      destination: { protocol: "http", hostname: "", port: 3000 },
      enabled: true,
      websocket: true,
      forceHttps: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: $CreateProxyHostSchema, { client }) => {
      const [error, result] = await api.proxyHost.create(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["proxy-hosts"] });
        notify.success(result);
        form.reset();
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
