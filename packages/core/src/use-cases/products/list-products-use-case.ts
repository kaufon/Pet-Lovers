import type { IProductsRepository } from "../../interfaces/repositories";
import { PaginationResponse } from "../../responses/pagination-response";

export class ListProductUseCase{
  private readonly productsRepository: IProductsRepository;
  constructor(productsRepository:IProductsRepository){
    this.productsRepository = productsRepository
  }
  async execute(){
    const products = await this.productsRepository.findMany()
    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemCount: products.length
    })
  }
}
