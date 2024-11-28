import { Button, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import { useRegisterClientForm } from "./use-register-client-form";

interface RegisterClientFormProps {
  onCancel: VoidFunction;
  onSubmit: VoidFunction;
}

export const RegisterClientForm = ({
  onCancel,
  onSubmit,
}: RegisterClientFormProps) => {
  const {
    register,
    handleSubmit,
    error,
    petsFieldArray: { fields: petFields, append: appendPet, remove: removePet },
    rgsFieldArray: { fields: rgsFields, append: appendRg, remove: removeRg },
    phonesFieldsArray: {
      fields: phonesFields,
      append: appendPhone,
      remove: removePhone,
    },
  } = useRegisterClientForm(onSubmit);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl text-center w-full font-bold">
            Registrar cliente
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            label="Nome"
            {...register("name")}
            errorMessage={error?.name?.message}
            isInvalid={Boolean(error.name)}
          />
          <Input
            label="Nome Social"
            {...register("socialName")}
            errorMessage={error.socialName?.message}
            isInvalid={Boolean(error.socialName)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            label="Valor do Cpf"
            {...register("cpf.value")}
            errorMessage={error.cpf?.value?.message}
            isInvalid={Boolean(error.cpf?.value)}
          />
          <Input
            label="Data de emissao do Cpf"
            type="date"
            {...register("cpf.emissionDate")}
            errorMessage={error.cpf?.emissionDate?.message}
            isInvalid={Boolean(error.cpf?.emissionDate)}
          />
        </div>
        <Divider />
        <div className="flex   flex-col space-y-6  ">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold">Pets</h2>
            <Button
              className="w-1/4"
              color="primary"
              onPress={() =>
                appendPet({ name: "", type: "", gender: "", race: "" })
              }
            >
              Adicionar Pet
            </Button>
          </div>

          {petFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-5 items-center">
              <Input
                label={`Nome do Pet ${index + 1}`}
                {...register(`pets.${index}.name`)}
                errorMessage={error?.pets?.[index]?.name?.message}
                isInvalid={Boolean(error?.pets?.[index]?.name)}
              />
              <Input
                label={`Espécie do Pet ${index + 1}`}
                {...register(`pets.${index}.type`)}
                errorMessage={error?.pets?.[index]?.types?.message}
                isInvalid={Boolean(error?.pets?.[index]?.types)}
              />
              <Input
                label={`Raca do Pet ${index + 1}`}
                {...register(`pets.${index}.race`)}
                errorMessage={error?.pets?.[index]?.race?.message}
                isInvalid={Boolean(error?.pets?.[index]?.race)}
              />
              <Input
                label={`Genero do Pet ${index + 1}`}
                {...register(`pets.${index}.gender`)}
                errorMessage={error?.pets?.[index]?.gender?.message}
                isInvalid={Boolean(error?.pets?.[index]?.gender)}
              />

              <div>
                <Button color="danger" onPress={() => removePet(index)}>
                  {`Remover Pet ${index + 1}`}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="flex flex-col space-y-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold">Rgs</h2>
            <Button
              color="primary"
              className="w-1/4"
              onPress={() =>
                appendRg({ value: "", emissionDate: "" as unknown as Date })
              }
            >
              Adicionar RG
            </Button>
          </div>
          {rgsFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-5 items-center">
              <Input
                label={`Número do RG ${index + 1}`}
                {...register(`rgs.${index}.value`)}
                errorMessage={error?.rgs?.[index]?.value?.message}
                isInvalid={Boolean(error?.rgs?.[index]?.value)}
              />
              <Input
                label={`Data de Emissão ${index + 1}`}
                type="date"
                {...register(`rgs.${index}.emissionDate`)}
                errorMessage={error?.rgs?.[index]?.emissionDate?.message}
                isInvalid={Boolean(error?.rgs?.[index]?.emissionDate)}
              />
              <div>
                <Button color="danger" onPress={() => removeRg(index)}>
                  {`Remover Rg ${index + 1}`}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="flex flex-col space-y-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold">Telefones</h2>
            <Button
              className="w-1/4"
              color="primary"
              onPress={() => {
                appendPhone({ ddd: "", number: "" });
              }}
            >
              Adicionar Telefone
            </Button>
          </div>
          {phonesFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-5 items-center">
              <Input
                label={`DDD do Telefone ${index + 1}`}
                {...register(`phones.${index}.ddd`)}
                errorMessage={error?.phones?.[index]?.ddd?.message}
                isInvalid={Boolean(error?.phones?.[index]?.ddd)}
              />
              <Input
                label={`Numero do Telefone ${index + 1}`}
                {...register(`phones.${index}.number`)}
                errorMessage={error?.phones?.[index]?.number?.message}
                isInvalid={Boolean(error?.phones?.[index]?.number)}
              />

              <div>
                <Button onPress={() => removePhone(index)} color="danger">
                  {`Remover Telefone ${index + 1}`}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="gap-5 flex flex-row">
          <Button color="danger" onPress={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Confirmar
          </Button>
        </div>
      </form>
    </>
  );
};
