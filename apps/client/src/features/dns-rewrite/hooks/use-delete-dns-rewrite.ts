import { api } from "@repo/server/api";
import { useMutation } from "@tanstack/react-query";
import { useNotify } from "@/hooks/use-notify";

export const useDeleteDNSRewrite = () => {
  const notify = useNotify();

  return useMutation({
    mutationFn: async ({ id }: { id: string }, { client }) => {
      const [error, result] = await api.dnsRewrite.delete({ id });
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["dns-rewrites"] });
        notify.success(result);
      }
    },
  });
};
