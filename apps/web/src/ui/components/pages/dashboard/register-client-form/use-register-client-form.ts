import { zodResolver } from "@hookform/resolvers/zod";
import {
    documentSchema,
  nameSchema,
  petSchema,
  phoneSchema,
} from "@validation/src/schemas";
import { useApi } from "apps/web/src/ui/hooks/use-api";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const RegisterClientFormSchema = z.object({
  name: nameSchema,
  socialName: nameSchema,
  cpf: documentSchema,
  pets: z.array(petSchema).optional(),
  rgs: z.array(documentSchema).optional(),
  phones: z.array(phoneSchema).optional()
});
type RegisterClientFormData = z.infer<typeof RegisterClientFormSchema>;
export function useRegisterClientForm(onSubmit:VoidFunction) {
  const { clientService } = useApi();
  const { register,control, reset,  handleSubmit, formState } =
    useForm<RegisterClientFormData>({
      resolver: zodResolver(RegisterClientFormSchema),
    });
  const petsFieldArray = useFieldArray({
    control,
    name: "pets", 
  });
  const rgsFieldArray = useFieldArray({
    control,
    name: "rgs"
  })

  const phonesFieldsArray = useFieldArray({
    control,
    name: "phones"
  })

  async function handleFormSubmit(formData: RegisterClientFormData) {
    const response = await clientService.registerClient({
      name: formData.name,
      socialName: formData.socialName,
      cpf: {
        value: formData.cpf.value,
        emissionDate: formData.cpf.emissionDate
      },
      pets: formData.pets ? formData.pets : [],
      rgs: formData.rgs ? formData.rgs : [],
      phones: formData.phones ? formData.phones : []
    });
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    reset();
    onSubmit()
  }
  return {
    register,
    reset,
    handleSubmit: handleSubmit(handleFormSubmit),
    error: formState.errors,
    petsFieldArray,
    rgsFieldArray,
    phonesFieldsArray,
  };
}
