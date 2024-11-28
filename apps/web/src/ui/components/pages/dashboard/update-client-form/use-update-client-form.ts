import type { Client } from "@core";
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

const UpdateClientFormSchema = z.object({
  name: nameSchema,
  socialName: nameSchema,
  cpf: documentSchema,
  pets: z.array(petSchema).optional(),
  rgs: z.array(documentSchema).optional(),
  phones: z.array(phoneSchema).optional(),
});
type UpdateClientFormProps = {
  client: Client;
  onSubmit: VoidFunction;
};
type UpdateClientFormData = z.infer<typeof UpdateClientFormSchema>;
export function useUpdateClientForm({
  client,
  onSubmit,
}: UpdateClientFormProps) {
  const { clientService } = useApi();
  const { register, control, reset, handleSubmit, formState } =
    useForm<UpdateClientFormData>({
      defaultValues: {
        name: client.name,
        socialName: client.socialName,
        cpf: client.cpf,
        pets: client.pets,
        rgs: client.rgs,
        phones: client.phones,
      },
      resolver: zodResolver(UpdateClientFormSchema),
    });
  const phonesFieldArray = useFieldArray({
    control,
    name: "phones",
  });

  const petsFieldArray = useFieldArray({
    control,
    name: "pets",
  });

  const rgsFieldArray = useFieldArray({
    control,
    name: "rgs",
  });
  async function handleFormSubmit(formData: UpdateClientFormData) {
    const partialClient: Record<string, unknown> = {};
    const updatedFields = Object.keys(formState.dirtyFields);
    partialClient.cpf = {
      ...client.cpf,
    };
    partialClient.pets = formData.pets || []; 
    partialClient.rgs = formData.rgs || []; 
    partialClient.phones = formData.phones || []; 
    const response = await clientService.updateClient(partialClient, client.id);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }

    reset(formData);
    onSubmit();
  }

  return {
    register,
    isDirty: formState.isDirty,
    reset,
    handleSubmit: handleSubmit(handleFormSubmit),
    error: formState.errors,
    phonesFieldArray,
    petsFieldArray,
    rgsFieldArray,
  };
}
