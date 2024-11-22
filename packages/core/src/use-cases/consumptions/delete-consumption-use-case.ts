import { IConsumptionRepository } from "../../interfaces/repositories";

type Request = {
  consumptionId: string;
};
export class DeleteConsumptionUseCase {
  private readonly consumptionRepository: IConsumptionRepository;
  constructor(consumptionRepository: IConsumptionRepository) {
    this.consumptionRepository = consumptionRepository;
  }
  async execute({ consumptionId }: Request) {
    const consumption =
      await this.consumptionRepository.findById(consumptionId);
    if (!consumption) throw new Error("Not found");
    await this.consumptionRepository.delete(consumptionId);
  }
}
