import { Select, Button, Input, SelectItem } from "@nextui-org/react";
import { useConsumeItemsForm } from "./use-consume-item-form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorHandlerSource } from "next/dist/server/app-render/create-error-handler";

type consumeItemFormProps = {
  clientId: string;
  onSubmit: VoidFunction;
  onCancel: VoidFunction;
};

export const ConsumeItemForm = ({
  clientId,
  onSubmit,
  onCancel,
}: consumeItemFormProps) => {
  const {
    isSubmiting,
    isFetchingProducts,
    items,
    isFetchingServices,
    refetchProducts,
    refetchServices,
    control,
    register,
    errors,
    reset,
    handleSubmit,
  } = useConsumeItemsForm({
    onSubmit,
    clientId,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-5">
        <Controller
          name="itemId"
          control={control}
          render={({ field: onChange }) => (
            <div>
              <Select
                label="Selecione o item"
                aria-label="Select Product"
                placeholder="Escolha o item a ser consumido"
                isLoading={isFetchingProducts}
                onChange={(e) => onChange.onChange(e)}
              >
                {items.map((item) => (
                  <SelectItem key={item.id || 1} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
              {errors.itemId && (
                <p className="text-red-500">{errors.itemId.message}</p>
              )}
            </div>
          )}
        />

        <Input
          {...register("amount", {
            setValueAs: (value) => Number.parseInt(value, 10),
          })}
          label="Quantia"
          type="number"
          isInvalid={Boolean(errors.amount)}
          errorMessage={errors.amount?.message}
        />
      </div>

      <div className="flex  flex-row gap-5">
        <Button color="danger" onPress={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="primary" isLoading={isSubmiting}>
          Submit
        </Button>
      </div>
    </form>
  );
};
