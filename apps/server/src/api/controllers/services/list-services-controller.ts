import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import { ListServiceUseCase } from "@core/use-cases/services/list-services-use-case";
import { servicesRepository } from "apps/server/src/database";

export class ListServicesController {
  async handle(http: IHttp) {
    const useCase = new ListServiceUseCase(servicesRepository);
    const response = await useCase.execute();
    return http.send(response, HTTP_STATUS_CODE.ok);
  }
}

