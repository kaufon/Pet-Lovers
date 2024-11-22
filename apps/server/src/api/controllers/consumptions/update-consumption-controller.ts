import type { ConsumptionDto } from "@core/dto"
import type { IHttp } from "@core/interfaces"
import { UpdateConsumptionUseCase } from "@core/use-cases"
import { consumptionRepository } from "apps/server/src/database"

type Params = {
  consumptionId:string
}
export class UpdateConsumptionController{
  async handle(http:IHttp){
    const {consumptionId} = http.getRouteParams<Params>()
    const consumptionDto = http.getBody<Partial<ConsumptionDto>>()
    const useCase = new UpdateConsumptionUseCase(consumptionRepository)
    const response = useCase.execute({consumptionId,consumptionDto})
    return response
  }
}
