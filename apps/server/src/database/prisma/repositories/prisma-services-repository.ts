import type { Service } from "@core/domain";
import { PrismaServiceMapper } from "../mappers";
import { prisma } from "../prisma-client";
import { PrismaError } from "../prisma-error";
import type { IServicesRepository } from "@core/interfaces";

export class PrismaServicesRepository implements IServicesRepository {
  private readonly mapper: PrismaServiceMapper = new PrismaServiceMapper();

  async findMany(): Promise<Service[]> {
    try {
      const prismaServices = await prisma.item.findMany({
        where: {
          item_type: "SERVICE",
        },
      });
      const services = prismaServices.map((service) =>
        this.mapper.toDomain(service),
      );
      return services;
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async findById(serviceId: string): Promise<Service | null> {
    try {
      const prismaService = await prisma.item.findUnique({
        where: {
          id: serviceId,
          item_type: "SERVICE",
        },
      });
      if (!prismaService) {
        return null
      }
      const service = this.mapper.toDomain(prismaService);
      return service;
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async delete(serviceId: string): Promise<void> {
    try {
      const prismaService = this.findById(serviceId);
      if (!prismaService) return
      await prisma.item.delete({
        where: {
          id: serviceId,
          item_type: "SERVICE",
        },
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async add(service: Service): Promise<void> {
    try {
      const prismaService = this.mapper.toPrisma(service);
      await prisma.item.create({
        data: prismaService,
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async update(service: Service): Promise<void> {
    try {
      const prismaService = this.mapper.toPrisma(service);
      await prisma.item.update({
        where: {
          id: prismaService.id,
        },
        data: prismaService,
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }
}

