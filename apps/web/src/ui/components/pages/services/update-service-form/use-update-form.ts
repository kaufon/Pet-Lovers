import { Service } from "@core";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, priceSchema } from "@validation/src/schemas";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const updateServiceFormSchema = z.object({
  name: nameSchema,
  price: priceSchema,
});
type UpdateServiceFormData = z.infer<typeof updateServiceFormSchema>;
type useUpdateServiceFormProps = {
  onSubmit: VoidFunction;
  onCancel: VoidFunction;
  service: Service;
};
export function useUpdateServiceForm({
  onSubmit,
  onCancel,
  service,
}: useUpdateServiceFormProps) {
  const { register, formState, reset, handleSubmit } =
    useForm<UpdateServiceFormData>({
      resolver: zodResolver(updateServiceFormSchema),
      defaultValues: {
        name: service.name,
        price: service.price,
      },
    });
  const { servicesService } = useApi();
  async function handleFormSubmit(formData: UpdateServiceFormData) {
    const partialService: Record<string, unknown> = {};
    const updatedFields = Object.keys(formState.dirtyFields);
    for (const updatedField of updatedFields) {
      const updatedValue =
        formData[updatedField as keyof UpdateServiceFormData];
      partialService[updatedField] = updatedValue;
    }
    if(!service.id) return
    const response = await servicesService.updateService(
      partialService,
      service.id,
    );
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    if(response.isSucess){
      reset()
      onCancel()
      onSubmit()
    }
  }
  return {
    errors: formState.errors,
    isDirty: formState.isDirty,
    isSubmiting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    reset,
  };
}
