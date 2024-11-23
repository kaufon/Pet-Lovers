import type { ClientDto } from "../../dto";
import type { IClientsRepository } from "../../interfaces/repositories";
import { ApiResponse } from "../../responses/api-response";
type Request = {
  clientId: string;
};
type Response = ClientDto & {
  consumptions: {
    itemId: string;
    itemName: string;
    totalAmount: number;
    totalSpent: number;
  }[];
};
export class GetClientUseCase {
  private readonly clientRepository: IClientsRepository;
  constructor(clientRepository: IClientsRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({ clientId }: Request) {
    const response = await this.clientRepository.getClientDetails(clientId);
    if (!response) throw new Error("not found");
    return new ApiResponse<Response>({ body: response, statusCode: 200 });
  }
}
