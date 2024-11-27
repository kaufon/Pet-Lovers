import { Product } from "@core";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, priceSchema } from "@validation/src/schemas";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerProductFormSchema = z.object({
  name: nameSchema,
  price: priceSchema,
});
type RegisterProductFormData = z.infer<typeof registerProductFormSchema>;
type useRegisterProductFormProps = {
  onSubmit: VoidFunction;
};
export function useRegisterProductForm({
  onSubmit,
}: useRegisterProductFormProps) {
  const { register, formState, reset, handleSubmit } =
    useForm<RegisterProductFormData>({
      resolver: zodResolver(registerProductFormSchema),
    });
  const { productsService } = useApi();
  async function handleFormSubmit(formData: RegisterProductFormData) {
    const product = Product.create({
      name: formData.name,
      price: formData.price,
      type: "PRODUCT",
    });
    const response = await productsService.registerProduct(product);
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
    isSubmitting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  };
}

