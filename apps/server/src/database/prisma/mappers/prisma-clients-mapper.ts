import { Client } from "@core/index";
import type { PrismaClient } from "../types";

export class PrismaClientsMapper {
  toDomain(prismaClient: PrismaClient): Client {
    return Client.create({
      id: prismaClient.id,
      name: prismaClient.name,
      socialName: prismaClient.socialName,
      cpf: {
        value: prismaClient.cpf.value,
        emissionDate: prismaClient.cpf.emission_date,
      },
      pets: prismaClient.pets.map((pet) => ({
        id: pet.id,
        name: pet.name,
        race: pet.race,
        type: pet.type,
        gender: pet.gender,
      })),
      phones: prismaClient.phones.map((phone) => ({
        ddd: phone.ddd,
        number: phone.number,
      })),
      rgs: prismaClient.rgs.map((rg) => ({
        value: rg.value,
        emissionDate: rg.emission_date,
      })),
    });
  }
  toPrisma(client: Client): PrismaClient {
    return {
      id: client.id,
      name: client.name,
      socialName: client.socialName,
      cpf: {
        id: "",
        value: client.cpf.value,
        emission_date: client.cpf.emissionDate,
        client_id: client.id,
      },
      pets: client.pets.map((pet) => ({
        id: pet.id,
        name: pet.name,
        gender: pet.gender,
        type: pet.type,
        race: pet.race,
        client_id: client.id,
      })),
      phones: client.phones.map((phone) => ({
        id: "",
        ddd: phone.ddd,
        number: phone.number,
        client_id: client.id,
      })),
      rgs: client.rgs.map((rg) => ({
        id: "",
        value: rg.value,
        emission_date: rg.emissionDate,
        client_id: client.id,
      })),
      registered_at: new Date(),
    };
  }
}
