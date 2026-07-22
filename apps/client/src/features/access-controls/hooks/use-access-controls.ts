import { api } from "@repo/server/api";
import { paginationSchema } from "@repo/shared/validation";
import { useQuery } from "@tanstack/react-query";
import { useControls } from "@/components/controls";

export const useAccessControls = () => {
  const { enabled, values, page } = useControls();

  return useQuery({
    enabled,
    queryKey: ["access-controls", values, page],
    queryFn: async () => {
      const { success, data } = paginationSchema.safeParse({ ...values, page });
      if (!success) throw new Error("Invalid query parameters");
      const [error, result] = await api.accessControl.list(data);
      if (error) throw error;
      return result;
    },
  });
};
