import { Client } from "../../domain"
import type { ClientDto } from "../../dto"
import type { IClientsRepository } from "../../interfaces/repositories"

type Request = {
  clientDto: ClientDto
}
export class RegisterClientUseCase{
  private readonly clientRepository: IClientsRepository
  constructor(clientRepository: IClientsRepository){
    this.clientRepository = clientRepository
  }
  async execute({clientDto}:Request){
    const client  = Client.create(clientDto)
    await this.clientRepository.add(client)
    return client.id
  }
}
