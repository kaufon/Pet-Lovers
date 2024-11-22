import { Service } from "@core/domain";
import type { PrismaService } from "../types";
import { Decimal } from "@prisma/client/runtime/library";

export class PrismaServiceMapper {
  toDomain(prismaService: PrismaService): Service {
    return Service.create({
      id: prismaService.id,
      name: prismaService.name,
      price: Number(prismaService.price),
      type: "SERVICE",
      ordersCount: prismaService.ordersCount,
    });
  }
  toPrisma(service: Service): PrismaService {
    return {
      id: service.id,
      name: service.name,
      price: new Decimal(service.price),
      item_type: "SERVICE",
      ordersCount: service.ordersCount,
    };
  }
}
