import type { ItemDto } from "../../dto";
import type { IServicesRepository } from "../../interfaces/repositories";

type Request = {
  serviceDto: Partial<ItemDto>;
  serviceId: string;
};

export class UpdateServiceUseCase {
  private readonly servicesRepository: IServicesRepository;

  constructor(servicesRepository: IServicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({ serviceDto, serviceId }: Request) {
    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new Error("Serviço não encontrado");
    const updatedService = service.update(serviceDto);
    await this.servicesRepository.update(updatedService);
    return serviceId;
  }
}

