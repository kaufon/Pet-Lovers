

import type { ClientDto } from "../../dto";
import type { IClientsRepository } from "../../interfaces/repositories";

type Request = {
  clientDto: Partial<ClientDto>;
  clientId: string;
};

export class UpdateClientUseCase {
  private readonly clientRepository: IClientsRepository;

  constructor(clientsRepository: IClientsRepository) {
    this.clientRepository = clientsRepository
  }

  async execute({ clientDto, clientId }: Request) {
    const client = await this.clientRepository.findById(clientId);
    if (!client) throw new Error("Client not found");
    const updatedClient = client.update(clientDto);
    await this.clientRepository.update(updatedClient);
    return clientId;
  }
}

