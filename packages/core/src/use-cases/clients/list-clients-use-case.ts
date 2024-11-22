import type { ClientDto } from "../../dto"
import type { IClientsRepository } from "../../interfaces/repositories"
import { PaginationResponse } from "../../responses/pagination-response"

export class ListClientUseCase{
  private readonly clientRepository: IClientsRepository
  constructor(clientRepository: IClientsRepository){
    this.clientRepository = clientRepository
  }
  async execute(){
    const response = await this.clientRepository.findMany()
    return new PaginationResponse({
      items: response.map((client) => client.dto),
      itemCount: response.length
    })
  }
}
