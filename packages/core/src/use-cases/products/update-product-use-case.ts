import type { ItemDto } from "../../dto"
import type { IProductsRepository } from "../../interfaces/repositories"

type Request = {
  productDto: Partial<ItemDto>
  productId: string
}
export class UpdateProductUseCase{
  private readonly productRepository: IProductsRepository
  constructor(productRepository: IProductsRepository){
    this.productRepository = productRepository
  }
  async execute({productDto,productId}: Request){
    const product = await this.productRepository.findById(productId)
    if(!product) throw new Error("Produto nao encontrado")
    const updatedProduct = product.update(productDto) 
    await this.productRepository.update(updatedProduct)
    return productId

  }
}
