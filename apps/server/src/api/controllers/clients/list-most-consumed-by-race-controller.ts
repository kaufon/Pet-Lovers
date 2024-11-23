
import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import {ListMostConsumedByRace} from "@core/use-cases/clients/list-top-consumed-by-race"
import { clientRepository } from "apps/server/src/database";

export class ListMostConsumedByRaceController{
  async handle(http:IHttp){
    const useCase = new ListMostConsumedByRace(clientRepository)
    const response = await useCase.execute()
    return http.send(response,HTTP_STATUS_CODE.ok)
  }
}
