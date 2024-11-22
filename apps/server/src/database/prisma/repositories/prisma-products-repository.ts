import type { Product } from "@core/domain";
import type { IProductsRepository } from "@core/interfaces";
import { PrismaProductsMapper } from "../mappers";
import { prisma } from "../prisma-client";
import { PrismaError } from "../prisma-error";

export class PrismaProductsRepository implements IProductsRepository {
  private readonly mapper: PrismaProductsMapper = new PrismaProductsMapper();
  async findMany(): Promise<Product[]> {
    try {
      const prismaProducts = await prisma.item.findMany({
        where: {
          item_type: "PRODUCT",
        },
      });
      const products = prismaProducts.map((product) =>
        this.mapper.toDomain(product),
      );
      return products;
    } catch (error) {
      throw new PrismaError(error);
    }
  }
  async findById(productId: string): Promise<Product | null> {
    try {
      const prismaProduct = await prisma.item.findUnique({
        where: {
          id: productId,
          item_type: "PRODUCT",
        },
      });
      if (!prismaProduct) {
        return null
      }
      const product = this.mapper.toDomain(prismaProduct);
      return product;
    } catch (error) {
      throw new PrismaError(error);
    }
  }
  async delete(productId: string): Promise<void> {
    try {
      const prismaProduct = this.findById(productId);
      if (!prismaProduct){
        throw new PrismaError("Item not found")
      }
      await prisma.item.delete({
        where: {
          id: productId,
          item_type: "PRODUCT",
        },
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }
  async add(product: Product): Promise<void> {
    try {
      const prismProduct = this.mapper.toPrisma(product)
      await prisma.item.create({
        data: prismProduct
      })
    } catch (error) {
      throw new PrismaError(error)
    }

  }
  async update(product: Product): Promise<void> {
    try {
      const prismaProduct = this.mapper.toPrisma(product)
      await prisma.item.update({
        where: {
          id: prismaProduct.id
        },
        data: prismaProduct
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
