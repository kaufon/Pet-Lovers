
import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import { ListTopconsumersUseCase } from "@core/use-cases";
import { clientRepository  } from "apps/server/src/database";


export class ListTopConsumersControllers {
  async handle(http: IHttp) {
    const useCase = new ListTopconsumersUseCase(clientRepository);
    const response = await useCase.execute();
    return http.send(response, HTTP_STATUS_CODE.ok);
  }
}
