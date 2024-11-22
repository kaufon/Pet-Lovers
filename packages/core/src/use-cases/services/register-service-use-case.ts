import { Service } from "../../domain";
import type { ItemDto } from "../../dto";
import type { IServicesRepository } from "../../interfaces/repositories";

type Request = {
  serviceDto: ItemDto;
};

export class RegisterServiceUseCase {
  private readonly servicesRepository: IServicesRepository;

  constructor(servicesRepository: IServicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({ serviceDto }: Request) {
    const service = Service.create(serviceDto);
    await this.servicesRepository.add(service);
    return service.id;
  }
}

