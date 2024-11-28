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
import { useRegisterServiceForm } from "./use-register-service-form";

interface RegisterServiceFormProps {
  onSubmit: VoidFunction;
  onCancel: VoidFunction;
}

export const RegisterServiceForm = ({
  onSubmit,
  onCancel,
}: RegisterServiceFormProps) => {
  const { errors, isSubmiting, register, handleSubmit } =
    useRegisterServiceForm({ onSubmit });
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register("name")}
            label="Nome"
            placeholder="Cirurgia patelar"
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
          />
          <Input
            {...register("price")}
            type="number"
            label="Preco"
            placeholder="R$"
            isInvalid={Boolean(errors.price)}
            errorMessage={errors.price?.message}
          />
        </div>
        <div className="flex flex-row gap-4 ">
          <Button type="submit" color="primary" isLoading={isSubmiting}>
            Confirmar 
          </Button>
          <Button
            color="danger"
            onClick={onCancel}
            type="button"
            isDisabled={isSubmiting}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};
