import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import {ListClientUseCase} from "@core/use-cases/clients/list-clients-use-case"
import { clientRepository } from "apps/server/src/database";

export class ListClientController{
  async handle(http:IHttp){
    const useCase = new ListClientUseCase(clientRepository)
    const response = await useCase.execute()
    return http.send(response,HTTP_STATUS_CODE.ok)
  }
}
