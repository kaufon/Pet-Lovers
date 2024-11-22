import type { IServicesRepository } from "../../interfaces/repositories";
import { PaginationResponse } from "../../responses/pagination-response";

export class ListServiceUseCase {
  private readonly servicesRepository: IServicesRepository;

  constructor(servicesRepository: IServicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute() {
    const services = await this.servicesRepository.findMany();
    return new PaginationResponse({
      items: services.map((service) => service.dto),
      itemCount: services.length,
    });
  }
}

