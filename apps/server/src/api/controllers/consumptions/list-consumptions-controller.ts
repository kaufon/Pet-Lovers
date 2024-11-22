import { HTTP_STATUS_CODE } from "@core/constants";
import { IHttp } from "@core/interfaces";
import { ListConsumptionsUseCase } from "@core/use-cases/consumptions";
import { consumptionRepository } from "apps/server/src/database";

export class ListConsumptionsController {
  async handle(http: IHttp) {
    const useCase = new ListConsumptionsUseCase(consumptionRepository);
    const response = await useCase.execute();
    return http.send(response, HTTP_STATUS_CODE.ok);
  }
}
