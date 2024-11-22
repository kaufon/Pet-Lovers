import { Consumption } from "../../domain"
import type { ConsumptionDto } from "../../dto"
import type { IConsumptionRepository } from "../../interfaces/repositories"

type Request = {
  consumptionDto: ConsumptionDto
}
export class RegisterConsumptionUseCase{
  private readonly consumptionRepository: IConsumptionRepository
  constructor(consumptionRepository:IConsumptionRepository){
    this.consumptionRepository = consumptionRepository
  }
  async execute({consumptionDto}:Request){
    const consumption = Consumption.create(consumptionDto)
    await this.consumptionRepository.add(consumption)
    return consumption.id
  }
}
