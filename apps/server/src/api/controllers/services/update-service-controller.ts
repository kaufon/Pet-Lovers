import type { ItemDto } from "@core/dto";
import type { IHttp } from "@core/interfaces";
import { UpdateServiceUseCase } from "@core/use-cases/services/update-service-use-case";
import { servicesRepository } from "apps/server/src/database";

type Params = {
  serviceId: string;
};

export class UpdateServiceController {
  async handle(http: IHttp) {
    const serviceDto = http.getBody<Partial<ItemDto>>();
    const { serviceId } = http.getRouteParams<Params>();
    const useCase = new UpdateServiceUseCase(servicesRepository);
    const response = await useCase.execute({ serviceId, serviceDto });
    return response;
  }
}

