import { api } from "@repo/server/api";
import { useMutation } from "@tanstack/react-query";
import { useNotify } from "@/hooks/use-notify";

export const useDeleteAccessControl = (id: string) => {
  const notify = useNotify();

  return useMutation({
    mutationFn: async (_, { client }) => {
      const [error, result] = await api.accessControl.delete({ id });
      if (error) {
        notify.error("Something went wrong");
        throw error;
      } else {
        client.invalidateQueries({ queryKey: ["access-controls"] });
        notify.success(result);
      }
    },
  });
};
