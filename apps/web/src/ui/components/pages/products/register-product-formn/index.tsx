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
import { useRegisterProductForm } from "./use-register-product-form";

interface RegisterProductFormProps {
  onSubmit: VoidFunction;
  onCancel: VoidFunction;
}

export const RegisterProductForm = ({
  onSubmit,
  onCancel,
}: RegisterProductFormProps) => {
  const { errors, isSubmitting, register, handleSubmit } =
    useRegisterProductForm({ onSubmit });
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register("name")}
            label="Nome"
            placeholder="Produto A"
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
        <div className="flex flex-row gap-4 ">
          <Button type="submit" color="primary" isLoading={isSubmitting}>
             Confirmar
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

