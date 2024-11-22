
import type { IConsumptionRepository } from "../../interfaces/repositories";
import { PaginationResponse } from "../../responses/pagination-response";

export class ListMostConsumedItems {
  private readonly consumptionRepository: IConsumptionRepository;
  constructor(consumptionRepository: IConsumptionRepository) {
    this.consumptionRepository = consumptionRepository;
  }
  async execute() {
    const consumptions = await this.consumptionRepository.fiindMostConsumedItems();
    return new PaginationResponse({
      itemCount: consumptions.length,
      items: consumptions.map((consumption) => consumption),
    });
  }
}
