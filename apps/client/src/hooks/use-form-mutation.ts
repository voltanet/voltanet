import { useForm } from "@mantine/form";
import { type MutateFunction, type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import type { ZodType, z } from "zod";
import { useNotify } from "./use-notify";

type $UseFormMutation<Z, I, R, F = MutateFunction<R, Error, I>> = {
  mutationFn: F;
  schema: Z;
  initialValues?: I;
} & UseMutationOptions<R, Error, I, unknown>;

export const useFormMutation = <Z extends ZodType<any>, I extends z.infer<Z>, R>(
  // extract form props and keep the rest for the mutation.
  { initialValues, schema, ...options }: $UseFormMutation<Z, I, R>,
) => {
  const notify = useNotify();
  const form = useForm({ initialValues, validate: zod4Resolver(schema), mode: "uncontrolled" });
  const mutation = useMutation({
    ...options,
    onSettled: (data, error) => {
      if (error) return notify.error(error.message);
      if (data) {
        form.reset();
      }
    },
  });

  const onSubmit = form.onSubmit((values) => mutation.mutate(values));

  return { form: { ...form, onSubmit }, ...mutation };
};
