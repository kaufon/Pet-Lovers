import type { IProductsRepository } from "../../interfaces/repositories";

export class DeleteProductUseCase{
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository){
    this.productsRepository = productsRepository
  }
  async execute(productId:string){
    const product = await this.productsRepository.findById(productId)
    if(!product) throw new Error("Item not found")
    const response = await this.productsRepository.delete(productId)
    return response
  }
}
