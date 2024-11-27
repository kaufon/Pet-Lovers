import { Product } from "@core";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, priceSchema } from "@validation/src/schemas";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const updateProductFormSchema = z.object({
  name: nameSchema,
  price: priceSchema,
});
type UpdateProductFormData = z.infer<typeof updateProductFormSchema>;
type useUpdateProductFormProps = {
  onSubmit: VoidFunction;
  onCancel: VoidFunction;
  product: Product;
};
export function useUpdateProductForm({
  onSubmit,
  onCancel,
  product,
}: useUpdateProductFormProps) {
  const { register, formState, reset, handleSubmit } =
    useForm<UpdateProductFormData>({
      resolver: zodResolver(updateProductFormSchema),
      defaultValues: {
        name: product.name,
        price: product.price,
      },
    });
  const { productsService } = useApi();
  async function handleFormSubmit(formData: UpdateProductFormData) {
    const partialProduct: Record<string, unknown> = {};
    const updatedFields = Object.keys(formState.dirtyFields);
    for (const updatedField of updatedFields) {
      const updatedValue =
        formData[updatedField as keyof UpdateProductFormData];
      partialProduct[updatedField] = updatedValue;
    }
    if (!product.id) return;
    const response = await productsService.updateProduct(
      partialProduct,
      product.id,
    );
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    if (response.isSucess) {
      reset();
      onCancel();
      onSubmit();
    }
  }
  return {
    errors: formState.errors,
    isDirty: formState.isDirty,
    isSubmitting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    reset,
  };
}

