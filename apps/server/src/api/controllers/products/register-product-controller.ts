import type { ItemDto } from "@core/dto";
import type { IHttp } from "@core/interfaces";
import { RegisterProductUseCase } from "@core/use-cases/products/register_product-use-case";
import { productsRepository } from "apps/server/src/database";
export class RegisterProductController {
  async handle(http: IHttp) {
    const productDto = http.getBody<ItemDto>();
    const useCase = new RegisterProductUseCase(productsRepository);
    const response = await useCase.execute({ productDto });
    return response;
  }
}
