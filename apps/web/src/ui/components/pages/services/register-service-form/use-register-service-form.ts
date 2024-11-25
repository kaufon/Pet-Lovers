import { Service } from "@core";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, priceSchema } from "@validation/src/schemas";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerServiceFormSchema = z.object({
  name: nameSchema,
  price: priceSchema,
});
type RegisterServiceFormData = z.infer<typeof registerServiceFormSchema>;
type useRegisterServiceFormProps = {
  onSubmit: VoidFunction;
};
export function useRegisterServiceForm({
  onSubmit,
}: useRegisterServiceFormProps) {
  const { register, formState, reset, handleSubmit } =
    useForm<RegisterServiceFormData>({
      resolver: zodResolver(registerServiceFormSchema),
    });
  const { servicesService } = useApi();
  async function handleFormSubmit(formData: RegisterServiceFormData) {
    const service = Service.create({
      name: formData.name,
      price: formData.price,
      type: "SERVICE",
    });
    console.log(service)
    const response = await servicesService.registerService(service);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }

    if (response.isSucess) {
      reset();
      onSubmit();
    }
  }
  return {
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  };
}
