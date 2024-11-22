import type { IHttp } from "@core/interfaces";
import { DeleteProductUseCase } from "@core/use-cases";
import { productsRepository } from "apps/server/src/database";
type Body = {
  productId: string
}
export class DeleteProductController {
  async handle(http: IHttp) {
    const { productId } = http.getBody<Body>()
    const useCase = new DeleteProductUseCase(productsRepository)
    const response = useCase.execute(productId)
    return response
  }
}
