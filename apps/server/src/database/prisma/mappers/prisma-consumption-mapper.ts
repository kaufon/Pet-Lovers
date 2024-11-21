import { Consumption } from "@core/domain";
import type { PrismaConsumption } from "../types";

export class PrismaConsumptionMapeer {
  toDomain(prismaConsumption: PrismaConsumption): Consumption {
    return Consumption.create({
      clientId: prismaConsumption.client_id,
      itemId: prismaConsumption.item_id,
      amount: prismaConsumption.amount,
    });
  }
  toPrisma(consumption: Consumption): PrismaConsumption {
    return {
      id: "",
      item_id: consumption.itemId,
      client_id: consumption.clientId,
      amount: consumption.amount,
    };
  }
}
