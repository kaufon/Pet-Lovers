
import type { ClientDto } from "../../dto";
import type { ApiResponse, PaginationResponse } from "../../responses";

export interface IClientsService {
  listClients(): Promise<ApiResponse<PaginationResponse<ClientDto>>>;
  updateClient(partialClientDto: Partial<ClientDto>, clientId: string): Promise<ApiResponse<void>>;
  deleteClient(clientId: string): Promise<ApiResponse<void>>;
  registerClient(client: ClientDto): Promise<ApiResponse<void>>;
}

