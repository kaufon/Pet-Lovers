

import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import {ListMostConsumedByType} from "@core/use-cases/clients/list-top-consumed-by-type"
import { clientRepository } from "apps/server/src/database";

export class ListMostConsumedByTypeController{
  async handle(http:IHttp){
    const useCase = new ListMostConsumedByType(clientRepository)
    const response = await useCase.execute()
    return http.send(response,HTTP_STATUS_CODE.ok)
  }
}
