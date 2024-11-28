import { Consumption } from "@core";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  integerSchema,
  nameSchema,
  numberSchema,
} from "@validation/src/schemas";
import { CACHE } from "apps/web/src/constants";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useCache } from "apps/web/src/ui/hooks/use-cache";
import { useForm } from "react-hook-form";
import { z } from "zod";
type useConsumeItemsFormProps = {
  onSubmit: VoidFunction;
  clientId: string;
};
const consumeItemsFormSchema = z.object({
  itemId: nameSchema,
  amount: integerSchema,
});
type consumeItemsFormData = z.infer<typeof consumeItemsFormSchema>;
export function useConsumeItemsForm({
  onSubmit,
  clientId,
}: useConsumeItemsFormProps) {
  const { productsService, servicesService, consumptionsService } = useApi();

  async function fetchServices() {
    const response = await servicesService.listServices();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body;
  }
  const { register, control, reset, formState, handleSubmit } =
    useForm<consumeItemsFormData>({
      resolver: zodResolver(consumeItemsFormSchema),
    });
  async function fetchProducts() {
    const response = await productsService.listProducts();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body;
  }
  async function handleFormSubmit(formData: consumeItemsFormData) {
    const consumption = Consumption.create({
      itemId: formData.itemId,
      clientId: clientId,
      amount: formData.amount,
    });
    const response = await consumptionsService.registerConsumption(consumption);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    reset();
    onSubmit();
  }

  const {
    data: productsData,
    isFetching: isFetchingProducts,
    refetch: refetchProducts,
  } = useCache({
    fetcher: fetchProducts,
    key: CACHE.products.key,
  });

  const {
    data: servicesData,
    isFetching: isFetchingServices,
    refetch: refetchServices,
  } = useCache({
    fetcher: fetchServices,
    key: CACHE.services.key,
  });
  const services = servicesData ? servicesData.items : []
  const products = productsData ? productsData.items : []
  const items = [
    ...(products.map((product) => ({
      id: product.id,
      name: product.name,
      type: 'PRODUCT',
    })) || []),
    ...(services.map((service) => ({
      id: service.id,
      name: service.name,
      type: 'SERVICE',
    })) || []),
  ];
  return {
    items,
    isFetchingProducts,
    refetchProducts,
    isFetchingServices,
    refetchServices,
    control,
    register,
    isSubmiting:formState.isSubmitting,
    reset,
    errors: formState.errors,
    handleSubmit: handleSubmit(handleFormSubmit),
  };
}
