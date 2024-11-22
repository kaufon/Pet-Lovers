import type { ConsumptionDto } from "../../dto";
import type { IConsumptionRepository } from "../../interfaces/repositories";

type Request = {
  consumptionDto: Partial<ConsumptionDto>;
  consumptionId: string;
};
export class UpdateConsumptionUseCase {
  private readonly consumptionRepository: IConsumptionRepository;
  constructor(consumptionRepository: IConsumptionRepository) {
    this.consumptionRepository = consumptionRepository;
  }
  async execute({consumptionDto,consumptionId}:Request){
    const consumption = await this.consumptionRepository.findById(consumptionId)
    if(!consumption) throw new Error("Not found")
    const updatedConsumption = consumption.update(consumptionDto)
    await this.consumptionRepository.update(updatedConsumption)
    return
  }
}
