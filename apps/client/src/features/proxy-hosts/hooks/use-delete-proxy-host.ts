import { api } from "@repo/server/api";
import { useMutation } from "@tanstack/react-query";
import { useNotify } from "@/hooks/use-notify";

export const useDeleteProxyHost = (id: string) => {
  const notify = useNotify();

  return useMutation({
    mutationFn: async (_, { client }) => {
      const [error, result] = await api.proxyHost.delete({ id });
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["proxy-hosts"] });
        notify.success(result);
      }
    },
  });
};
