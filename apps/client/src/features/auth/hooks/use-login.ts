import { signInSchema } from "@repo/shared/validation";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNotify } from "@/hooks/use-notify";
import { auth } from "../index";

export const useLogin = () => {
  const notify = useNotify();
  return useFormMutation({
    initialValues: { email: "", password: "" },
    schema: signInSchema,
    mutationFn: async (values) => {
      const { error } = await auth.signIn.email(values);
      if (error) throw error;
      notify.success("Signed in successfully");
    },
  });
};
