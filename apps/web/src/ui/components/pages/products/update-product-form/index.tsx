import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { useUpdateProductForm } from "./use-update-product-form";
import type { Product } from "@core";

interface UpdateProductFormProps {
  onSubmit: VoidFunction;
  onCancel: VoidFunction;
  product: Product;
}

export const UpdateProductForm = ({
  onSubmit,
  onCancel,
  product,
}: UpdateProductFormProps) => {
  const { errors, isSubmitting, register, handleSubmit, isDirty } =
    useUpdateProductForm({ onSubmit, onCancel, product });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register("name")}
            label="Nome"
            placeholder="Produto exemplo"
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
          />
          <Input
            {...register("price")}
            type="number"
            label="Preço"
            placeholder="R$"
            isInvalid={Boolean(errors.price)}
            errorMessage={errors.price?.message}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            type="submit"
            color="primary"
            isDisabled={!isDirty}
            isLoading={isSubmitting}
          >
            Atualizar Produto
          </Button>
          <Button
            color="danger"
            onClick={onCancel}
            type="button"
            isDisabled={isSubmitting}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

