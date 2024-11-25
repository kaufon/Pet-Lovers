import { ClientDto } from "@core/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  cellPhoneSchema,
  emailSchema,
  nameSchema,
} from "@validation/index";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdateClientFormSchema = z.object({
  nome: nameSchema,
  nomeSocial: nameSchema,
  email: emailSchema,
  endereco: addressSchema,
  telefones: z.array(cellPhoneSchema),
});
type UpdateClientFormProps = {
  client: ClientDto;
  onSubmit: VoidFunction;
};
type UpdateClientFormData = z.infer<typeof UpdateClientFormSchema>;
export function useUpdateClientForm({
  client,
  onSubmit,
}: UpdateClientFormProps) {
  const { clientService } = useApi();
  const [cepError, setCepError] = useState<string | null>(null);
  const { register, reset, handleSubmit, formState, setValue } =
    useForm<UpdateClientFormData>({
      defaultValues: {
        nome: client.nome,
        nomeSocial: client.nomeSocial,
        email: client.email,
        endereco: client.endereco,
        telefones: client.telefones,
      },
      resolver: zodResolver(UpdateClientFormSchema),
    });
  async function handleFormSubmit(formData: UpdateClientFormData) {
    const partialClient: Record<string, unknown> = { id: client.id || -1 };
    const updatedFields = Object.keys(formState.dirtyFields);

    
    partialClient.endereco = {
      id: client.endereco.id, 
      ...client.endereco, 
    };

    for (const updatedField of updatedFields) {
      if (updatedField.startsWith("endereco.")) {
        const addressField = updatedField.replace("endereco.", ""); 
        partialClient.endereco[addressField] = formData.endereco[addressField]; 
      } else {
        
        partialClient[updatedField] =
          formData[updatedField as keyof UpdateClientFormData];
      }
    }

    console.log("Payload to send:", partialClient);

    const response = await clientService.updateClient(
      partialClient as Partial<ClientDto>,
      client.id || -1,
    );
    console.log(response);

    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }

    reset();
    onSubmit();
  }

  async function addressByCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    console.log(data);
    if (data.erro) {
      setCepError("Cep Inexistente");
      return null;
    }
    setCepError(null);
    return data;
  }

  return {
    addressByCep,
    register,
    isDirty: formState.isDirty,
    reset,
    setValue,
    handleSubmit: handleSubmit(handleFormSubmit),
    error: formState.errors,
    cepError,
  };
}
