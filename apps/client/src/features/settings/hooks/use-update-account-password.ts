import { updatePasswordSchema } from "@repo/shared/validation";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@/features/auth";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNotify } from "@/hooks/use-notify";

export const useUpdateAccountPassword = () => {
  const notify = useNotify();
  const queryClient = useQueryClient();

  return useFormMutation({
    initialValues: { currentPassword: "", newPassword: "", revokeOtherSessions: false },
    schema: updatePasswordSchema,
    mutationFn: async (values) => auth.changePassword(values),
    onSuccess: ({ error }) => {
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["session"] });
      notify.success("Password updated successfully");
    },
  });
};
