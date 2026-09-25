import { type $UpdateDetailsSchema, updateDetailsSchema } from "@repo/shared/validation";
import { auth } from "@/features/auth";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNotify } from "@/hooks/use-notify";

export type $UseUpdateAccountDetails = $UpdateDetailsSchema;

export const useUpdateAccountDetails = (initialValues: $UseUpdateAccountDetails) => {
  const notify = useNotify();

  return useFormMutation({
    initialValues,
    schema: updateDetailsSchema,
    mutationFn: async (values) => {
      const { error } = await auth.updateUser(values);
      if (error) throw new Error(error.message);
      notify.success("Account updated successfully");
    },
  });
};
