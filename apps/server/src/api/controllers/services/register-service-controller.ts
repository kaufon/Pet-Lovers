import type { ItemDto } from "@core/dto";
import type { IHttp } from "@core/interfaces";
import { RegisterServiceUseCase } from "@core/use-cases/services/register-service-use-case";
import { servicesRepository } from "apps/server/src/database";

export class RegisterServiceController {
  async handle(http: IHttp) {
    const serviceDto = http.getBody<ItemDto>();
    console.log(serviceDto)
    const useCase = new RegisterServiceUseCase(servicesRepository);
    const response = await useCase.execute({ serviceDto });
    return response;
  }
}
