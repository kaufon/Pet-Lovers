import { Consumption } from "@core/domain";
import type { PrismaConsumption } from "../types";

export class PrismaConsumptionMapeer {
  toDomain(prismaConsumption: PrismaConsumption): Consumption {
    return Consumption.create({
      id: prismaConsumption.id,
      price: prismaConsumption.price,
      clientId: prismaConsumption.client_id,
      itemId: prismaConsumption.item_id,
      amount: prismaConsumption.amount,
    });
  }
  toPrisma(consumption: Consumption): PrismaConsumption {
    return {
      id: consumption.id,
      price: consumption.price,
      item_id: consumption.itemId,
      client_id: consumption.clientId,
      amount: consumption.amount,
    };
  }
}
