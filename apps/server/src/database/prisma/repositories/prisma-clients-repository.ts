import type { IClientsRepository } from "@core/interfaces/repositories/clients-repository";
import { PrismaClientsMapper } from "../mappers";
import { prisma } from "../prisma-client";
import type { PrismaClient } from "../types";
import type { Client, Pet } from "@core/domain";
import { PrismaError } from "../prisma-error";

export class PrismaClientsRepository implements IClientsRepository {
  private readonly mapper: PrismaClientsMapper = new PrismaClientsMapper();
  async findMany(): Promise<Client[]> {
    const prismaClient = await prisma.client.findMany({
      include: {
        Cpf: true,
        phones: true,
        rgs: true,
        pets: true,
        Consumption: {
          select: {
            amount: true,
          },
        },
      },
    });
    const prismaClients = prismaClient.map((client) => ({
      id: client.id,
      cpf: client.Cpf,
      name: client.name,
      socialName: client.socialName,
      rgs: client.rgs,
      pets: client.pets,
      phones: client.phones,
      registered_at: client.registered_at,
    }));
    return (prismaClients as PrismaClient[]).map((client) =>
      this.mapper.toDomain(client),
    );
  }
  async findById(clientId: string): Promise<Client | null> {
    const prismaClient = await prisma.client.findUnique({
      include: {
        Cpf: true,
        phones: true,
        pets: true,
        rgs: true,
        Consumption: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        id: clientId,
      },
    });
    if (!prismaClient) return null;
    const client = {
      id: prismaClient.id,
      cpf: prismaClient.Cpf,
      name: prismaClient.name,
      socialName: prismaClient.socialName,
      rgs: prismaClient.rgs,
      pets: prismaClient.pets,
      phones: prismaClient.phones,
      registered_at: prismaClient.registered_at,
    };
    return this.mapper.toDomain(client as PrismaClient);
  }
  async delete(clientId: string): Promise<void> {
    const prismaClient = await this.findById(clientId);
    if (!prismaClient) throw new Error("Client not found");
    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });
  }
  async add(client: Client): Promise<void> {
    const prismaClient = this.mapper.toPrisma(client);
    try {
      await prisma.client.create({
        data: {
          id: prismaClient.id,
          name: prismaClient.name,
          socialName: prismaClient.socialName,
          Cpf: {
            create: {
              emission_date: prismaClient.cpf.emission_date,
              value: prismaClient.cpf.value,
            },
          },
          rgs: {
            create: prismaClient.rgs.map((rg) => ({
              value: rg.value,
              emission_date: rg.emission_date,
            })),
          },
          pets: {
            create: prismaClient.pets.map((pet) => ({
              name: pet.name,
              type: pet.type,
              gender: pet.gender,
              race: pet.race,
            })),
          },
          phones: {
            create: prismaClient.phones.map((phone) => ({
              ddd: phone.ddd,
              number: phone.number,
            })),
          },
        },
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }
  async update(client: Client): Promise<void> {
    const prismaClient = this.mapper.toPrisma(client);
    await prisma.client.update({
      data: {
        name: prismaClient.name,
        socialName: prismaClient.socialName,
        Cpf: {
          update: {
            emission_date: prismaClient.cpf.emission_date,
            value: prismaClient.cpf.value,
          },
        },
        rgs: {
          deleteMany: {},
          create: prismaClient.rgs.map((rg) => ({
            value: rg.value,
            emission_date: rg.emission_date,
          })),
        },
        pets: {
          deleteMany: {},
          create: prismaClient.pets.map((pet) => ({
            name: pet.name,
            type: pet.type,
            gender: pet.gender,
            race: pet.race,
          })),
        },
        phones: {
          deleteMany: {},
          create: prismaClient.phones.map((phone) => ({
            ddd: phone.ddd,
            number: phone.number,
          })),
        },
      },
      where: {
        id: prismaClient.id,
      },
    });
  }
  async addPet(pet: Pet, ownerId: string): Promise<void> {
    const client = await this.findById(ownerId);
    if (!client) throw new PrismaError("Client not found");
    await prisma.pet.create({
      data: {
        name: pet.name,
        type: pet.type,
        gender: pet.gender,
        race: pet.race,
        client_id: ownerId,
      },
    });
  }
  async findTop10Consumers(): Promise<
    { clientId: string; name: string; totalItems: number }[]
  > {
    const topConsumers = await prisma.consumption.groupBy({
      by: ["client_id"],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: "desc",
        },
      },
      take: 10,
    });

    const clients = await Promise.all(
      topConsumers.map(async (consumer) => {
        const client = await prisma.client.findUnique({
          where: { id: consumer.client_id },
          select: { name: true },
        });
        return {
          clientId: consumer.client_id,
          name: client?.name ?? "",
          totalItems: consumer._sum.amount || 0,
        };
      }),
    );

    return clients;
  }
  async findTop5Spenders(): Promise<{ clientId: string; name: string; totalSpended:  number }[]> {
    const topConsumers = await prisma.consumption.groupBy({
      by: ["client_id"],
      _sum: {
        price: true,
      },
      orderBy: {
        _sum: {
          price: "desc",
        },
      },
      take: 5,
    });

    const clients = await Promise.all(
      topConsumers.map(async (consumer) => {
        const client = await prisma.client.findUnique({
          where: { id: consumer.client_id },
          select: { name: true },
        });
        return {
          clientId: consumer.client_id,
          name: client?.name ?? "",
          totalSpended: consumer._sum.price || 0,
        };
      }),
    );

    return clients;

  }
}
