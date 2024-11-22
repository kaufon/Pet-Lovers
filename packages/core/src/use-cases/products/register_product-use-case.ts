import { Product } from "../../domain";
import type { ItemDto } from "../../dto";
import type { IProductsRepository } from "../../interfaces/repositories";

type Request = {
  productDto: ItemDto;
};
export class RegisterProductUseCase {
  private readonly productsRepository: IProductsRepository;
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute({ productDto }: Request) {
    const product = Product.create(productDto);
    await this.productsRepository.add(product);
    return product.id;
  }
}
