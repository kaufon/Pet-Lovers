import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import { ListMostConsumedItems } from "@core/use-cases/consumptions";
import { consumptionRepository } from "apps/server/src/database";

export class ListMostConsumedItemsController {
  async handle(http: IHttp) {
    const useCase = new ListMostConsumedItems(consumptionRepository);
    const response = await useCase.execute();
    return http.send(response, HTTP_STATUS_CODE.ok);
  }
}

