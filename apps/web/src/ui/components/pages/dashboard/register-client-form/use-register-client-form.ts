import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  cellPhoneSchema,
  emailSchema,
  nameSchema,
} from "@validation/src/schemas";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterClientFormSchema = z.object({
  nome: nameSchema,
  nomeSocial: nameSchema,
  email: emailSchema,
  endereco: addressSchema,
  telefones: z.array(cellPhoneSchema),
});
type RegisterClientFormData = z.infer<typeof RegisterClientFormSchema>;
export function useRegisterClientForm(onSubmit:VoidFunction) {
  const { clientService } = useApi();
  const [cepError, setCepError] = useState<string | null>(null);
  const { register, reset, setValue, handleSubmit, formState } =
    useForm<RegisterClientFormData>({
      resolver: zodResolver(RegisterClientFormSchema),
    });
  async function handleFormSubmit(formData: RegisterClientFormData) {
    const response = await clientService.registerClient(formData);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    reset();
    onSubmit()
  }
  async function addressByCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    console.log(data)
    if (data.erro) {
      setCepError("Cep Inexistente");
      return null;
    }
    setCepError(null)
    return data
  }

  return {
    addressByCep,
    register,
    reset,
    setValue,
    handleSubmit: handleSubmit(handleFormSubmit),
    error: formState.errors,
    cepError,
  };
}
