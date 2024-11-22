import {
  PrismaClientsRepository,
  PrismaConsumptionRepository,
  PrismaProductsRepository,
  PrismaServicesRepository,
} from "./prisma/repositories";
export const consumptionRepository = new PrismaConsumptionRepository()
export const servicesRepository = new PrismaServicesRepository();
export const clientRepository = new PrismaClientsRepository()
export const productsRepository = new PrismaProductsRepository();
