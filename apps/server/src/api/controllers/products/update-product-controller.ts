import type { ItemDto } from "@core/dto";
import type { IHttp } from "@core/interfaces";
import { UpdateProductUseCase } from "@core/use-cases/products/update-product-use-case";
import { productsRepository } from "apps/server/src/database";
type Params = {
  productId: string;
};
export class UpdatePRoductController {
  async handle(http: IHttp) {
    const productDto = http.getBody<Partial<ItemDto>>();
    const { productId } = http.getRouteParams<Params>();
    const useCase = new UpdateProductUseCase(productsRepository);
    const response = await useCase.execute({ productId, productDto });
    return response;
  }
}
