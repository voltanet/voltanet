import { useForm } from "@mantine/form";
import { api } from "@repo/server/api";
import { type $UpdateDNSUpstreamSchema, updateDNSUpstreamSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotify } from "@/hooks/use-notify";

export type $UseUpdateDNSUpstream = $UpdateDNSUpstreamSchema;

export const useUpdateDNSUpstream = (initialValues: $UseUpdateDNSUpstream) => {
  const notify = useNotify();

  const form = useForm<$UpdateDNSUpstreamSchema>({
    validate: zod4Resolver(updateDNSUpstreamSchema),
    initialValues,
  });

  const mutation = useMutation({
    mutationFn: async (values: $UpdateDNSUpstreamSchema, { client }) => {
      const [error, result] = await api.dnsUpstream.update(values);
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["dns-upstreams"] });
        notify.success(result);
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
