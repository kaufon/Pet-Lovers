import type { CepAddress } from "@core/dtos";
import { Button, Input } from "@nextui-org/react";
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
  const [address, setAddress] = useState<CepAddress | null>(null);
  const [isCepRegistered, setIsCepRegistered] = useState(false);
  const { register, handleSubmit, error, addressByCep, setValue, cepError } =
    useRegisterClientForm(onSubmit);

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
            {...register("nome")}
            errorMessage={error?.nome?.message}
            isInvalid={Boolean(error.nome)}
          />
          <Input
            label="Nome Social"
            {...register("nomeSocial")}
            errorMessage={error.nomeSocial?.message}
            isInvalid={Boolean(error.nomeSocial)}
          />
        </div>
        <div className="grid grid-rows-1">
          <Input
            label="E-mail"
            {...register("email")}
            errorMessage={error.email?.message}
            isInvalid={Boolean(error.email)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            type="number"
            label="CEP"
            {...register("endereco.codigoPostal")}
            isInvalid={Boolean(cepError)}
            errorMessage={cepError}
            onChange={async (e) => {
              const cepValue = e.target.value;
              setValue("endereco.codigoPostal", cepValue);
              if (cepValue.length === 8) {
                const addressData = await addressByCep(cepValue);
                if (addressData) {
                  setAddress(addressData);
                  setValue("endereco.rua", addressData.logradouro || "");
                  setValue("endereco.estado", addressData.uf || "");
                  setValue("endereco.cidade", addressData.localidade || "");
                  setValue("endereco.bairro", addressData.bairro || "");
                  setValue("telefones.0.ddd", addressData.ddd || "");
                }
              }
            }}
          />
          <Input
            label="Estado"
            value={address?.estado || ""}
            {...register("endereco.estado")}
            errorMessage={error.endereco?.estado?.message}
            isInvalid={Boolean(error.endereco?.estado)}
            isReadOnly={isCepRegistered}
          />
        </div>
        <div className="grid grid-rows-5 gap-5">
          <Input
            label="Cidade"
            value={address?.localidade || ""}
            {...register("endereco.cidade")}
            errorMessage={error.endereco?.cidade?.message}
            isInvalid={Boolean(error.endereco?.cidade)}
            isDisabled={isCepRegistered}
          />
          <Input
            label="Bairro"
            value={address?.bairro || ""}
            {...register("endereco.bairro")}
            errorMessage={error.endereco?.bairro?.message}
            isInvalid={Boolean(error.endereco?.bairro)}
            isDisabled={isCepRegistered}
          />
          <Input
            label="Rua"
            value={address?.logradouro || ""}
            {...register("endereco.rua")}
            errorMessage={error.endereco?.rua?.message}
            isInvalid={Boolean(error.endereco?.rua)}
            isDisabled={isCepRegistered}
          />
          <Input
            type="number"
            label="Número"
            {...register("endereco.numero")}
            errorMessage={error.endereco?.numero?.message}
            isInvalid={Boolean(error.endereco?.numero)}
          />
          <Input
            label="Informações Adicionais"
            {...register("endereco.informacoesAdicionais")}
            errorMessage={error.endereco?.informacoesAdicionais?.message}
            isInvalid={Boolean(error.endereco?.informacoesAdicionais)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            type="number"
            value={address?.ddd || ""}
            label="DDD"
            {...register("telefones.0.ddd")}
            errorMessage={error.telefones?.[0]?.ddd?.message}
            isInvalid={Boolean(error.telefones?.[0]?.ddd)}
          />
          <Input
            type="number"
            label="Número de Telefone"
            {...register("telefones.0.numero")}
            errorMessage={error.telefones?.[0]?.numero?.message}
            isInvalid={Boolean(error.telefones?.[0]?.numero)}
          />
        </div>
        <div className="gap-5 flex flex-row">
          <Button
            color="danger"
            className="text-red-600 bg-opacity-20"
            onPress={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="success"
            className="text-green-600 bg-opacity-20"
          >
            Confirmar
          </Button>
        </div>
      </form>
    </>
  );
};
