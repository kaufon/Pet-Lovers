import type { ConsumptionDto } from "@core/dto"
import type { IHttp } from "@core/interfaces"
import { RegisterConsumptionUseCase } from "@core/use-cases/consumptions/register-consumption-use-case"
import { consumptionRepository } from "apps/server/src/database"

export class RegisterConsumptionController{
  async handle(http:IHttp){
    const consumptionDto = http.getBody<ConsumptionDto>()
    const useCase = new RegisterConsumptionUseCase(consumptionRepository)
    const response = await useCase.execute({ consumptionDto })
    return response
  }
}
