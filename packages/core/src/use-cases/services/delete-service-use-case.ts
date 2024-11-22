import type { IServicesRepository } from "../../interfaces/repositories";

export class DeleteServiceUseCase {
  private readonly servicesRepository: IServicesRepository;

  constructor(servicesRepository: IServicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute(serviceId: string) {
    const service = await this.servicesRepository.findById(serviceId)
    if(!service) throw new Error("Item not found")
    const response = await this.servicesRepository.delete(serviceId)
    return response;
  }
}

