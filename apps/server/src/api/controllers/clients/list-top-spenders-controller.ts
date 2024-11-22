

import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import { ListTopSpendersUseCase } from "@core/use-cases/clients/list-top-spenders-use-case";
import { clientRepository  } from "apps/server/src/database";


export class ListTopSpenderController {
  async handle(http: IHttp) {
    const useCase = new ListTopSpendersUseCase(clientRepository);
    const response = await useCase.execute();
    return http.send(response, HTTP_STATUS_CODE.ok);
  }
}
