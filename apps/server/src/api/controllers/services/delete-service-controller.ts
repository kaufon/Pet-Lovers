import type { IHttp } from "@core/interfaces";
import { DeleteServiceUseCase } from "@core/use-cases";
import { servicesRepository } from "apps/server/src/database";

type Body = {
  serviceId: string;
};

export class DeleteServiceController {
  async handle(http: IHttp) {
    const { serviceId } = http.getBody<Body>();
    const useCase = new DeleteServiceUseCase(servicesRepository);
    const response = await useCase.execute(serviceId);
    return response;
  }
}

