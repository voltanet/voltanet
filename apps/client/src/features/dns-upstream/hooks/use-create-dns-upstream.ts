import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $CreateDNSUpstreamSchema, createDNSUpstreamSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export const useCreateDNSUpstream = () => {
  const notify = useNotify();

  const form = useForm<$CreateDNSUpstreamSchema>({
    validate: zod4Resolver(createDNSUpstreamSchema),
    initialValues: { name: "", enabled: true, servers: [] },
  });

  const mutation = useMutation({
    mutationFn: async (values: $CreateDNSUpstreamSchema, { client }) => {
      const [error, result] = await api.dnsUpstream.create(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["dns-upstreams"] });
        notify.success(result);
        form.reset();
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
