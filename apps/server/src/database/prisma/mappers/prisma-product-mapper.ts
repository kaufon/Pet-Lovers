import { Product } from "@core/domain";
import type { PrismaProduct } from "../types";
import { Decimal } from "@prisma/client/runtime/library";

export class PrismaProductsMapper {
  toDomain(prismaProduct: PrismaProduct): Product {
    return Product.create({
      id: prismaProduct.id,
      name: prismaProduct.name,
      price: Number(prismaProduct.price),
      type: "PRODUCT",
      ordersCount: prismaProduct.ordersCount,
    });
  }
  toPrisma(product: Product): PrismaProduct {
    return {
      id: product.id,
      name: product.name,
      item_type: "PRODUCT",
      price: new Decimal(product.price),
      ordersCount: product.ordersCount,
    };
  }
}
