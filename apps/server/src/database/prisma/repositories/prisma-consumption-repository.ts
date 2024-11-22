import type { IConsumptionRepository } from "@core/interfaces/repositories/consumption-repository";
import { PrismaConsumptionMapeer } from "../mappers";
import { prisma } from "../prisma-client";
import type { Consumption } from "@core/domain";
import { PrismaError } from "../prisma-error";
export class PrismaConsumptionRepository implements IConsumptionRepository {
  private readonly mapper: PrismaConsumptionMapeer =
    new PrismaConsumptionMapeer();
  async findMany(): Promise<Consumption[]> {
    const prismaConsumptions = await prisma.consumption.findMany();
    return prismaConsumptions.map(this.mapper.toDomain);
  }
  async findById(consumptionId: string): Promise<Consumption | null> {
    const prismaConsumption = await prisma.consumption.findUnique({
      where: {
        id: consumptionId,
      },
    });
    if (!prismaConsumption) return null;
    return this.mapper.toDomain(prismaConsumption);
  }
  async add(consumption: Consumption): Promise<void> {
    const prismaConsumption = this.mapper.toPrisma(consumption);
    const item = await prisma.item.findUnique({
      where: {
        id: prismaConsumption.item_id,
      },
      select: { price: true, ordersCount: true },
    });

    if (!item) throw new PrismaError("Item not found");

    const totalPrice = prismaConsumption.amount * Number(item.price);

    const updatedOrderCount =
      (item.ordersCount || 0) + prismaConsumption.amount;

    await prisma.consumption.create({
      data: {
        id: prismaConsumption.id,
        item_id: prismaConsumption.item_id,
        amount: prismaConsumption.amount,
        client_id: prismaConsumption.client_id,
        price: totalPrice,
      },
    });

    await prisma.item.update({
      where: {
        id: prismaConsumption.item_id,
      },
      data: {
        ordersCount: updatedOrderCount,
      },
    });
  }
  async delete(consumptionId: string): Promise<void> {
    const prismaConsumption = await this.findById(consumptionId);
    if (!prismaConsumption) throw new PrismaError("Consumption not found");
    await prisma.consumption.delete({
      where: {
        id: consumptionId,
      },
    });
  }
  async update(consumption: Consumption): Promise<void> {
    const prismaConsumption = this.mapper.toPrisma(consumption);
    const item = await prisma.item.findUnique({
      where: {
        id: prismaConsumption.item_id,
      },
      select: { price: true, ordersCount: true }, 
    });

    if (!item) throw new PrismaError("Item not found");

    const totalPrice = prismaConsumption.amount * Number(item.price);

    
    const currentConsumption = await prisma.consumption.findUnique({
      where: {
        id: prismaConsumption.id,
      },
      select: {
        amount: true, 
      },
    });

    if (!currentConsumption) throw new PrismaError("Consumption not found");

    
    const amountDifference =
      prismaConsumption.amount - currentConsumption.amount;

    
    const updatedOrderCount = (item.ordersCount || 0) + amountDifference;

    
    await prisma.consumption.update({
      where: {
        id: prismaConsumption.id,
      },
      data: {
        amount: prismaConsumption.amount,
        client_id: prismaConsumption.client_id,
        item_id: prismaConsumption.item_id,
        price: totalPrice,
      },
    });

    
    await prisma.item.update({
      where: {
        id: prismaConsumption.item_id,
      },
      data: {
        ordersCount: updatedOrderCount, 
      },
    });
  }
  async fiindMostConsumedItems(): Promise<
    { id: string; name: string; type: string; amount: number }[]
  > {
    const topItens = await prisma.consumption.groupBy({
      by: ["item_id"],
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
    const items = await Promise.all(
      topItens.map(async (item) => {
        const consumedItem = await prisma.item.findUnique({
          where: { id: item.item_id },
          select: { name: true, item_type: true },
        });
        return {
          id: item.item_id,
          name: consumedItem?.name ?? "",
          type: consumedItem?.item_type ?? "",
          amount: item._sum.amount || 0,
        };
      }),
    );
    return items;
  }
}
