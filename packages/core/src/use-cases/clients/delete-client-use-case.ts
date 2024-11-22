import type { IClientsRepository } from "../../interfaces/repositories";

type Request = {
  clientId: string;
};
export class DeleteClientUseCase {
  private readonly clientRepository: IClientsRepository;
  constructor(clientRepository: IClientsRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({clientId}:Request){
    const client = await this.clientRepository.findById(clientId)
    if(!client) throw new Error("Client not found")
    await this.clientRepository.delete(clientId)
    return
  }
}
