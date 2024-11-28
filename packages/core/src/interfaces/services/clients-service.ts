import type { ClientDto } from "../../dto";
import type { ApiResponse, PaginationResponse } from "../../responses";

export interface IClientsService {
  getClientDetails(clientId: string): Promise<
    ApiResponse<{
      client: ClientDto;
      consumptions: {
        itemId: string;
        itemName: string;
        totalAmount: number;
        totalSpent: number;
      }[];
    }>
  >;
  listClients(): Promise<ApiResponse<PaginationResponse<ClientDto>>>;
  updateClient(
    partialClientDto: Partial<ClientDto>,
    clientId: string,
  ): Promise<ApiResponse<void>>;
  deleteClient(clientId: string): Promise<ApiResponse<void>>;
  registerClient(client: ClientDto): Promise<ApiResponse<void>>;
  listSpenders(): Promise<
    ApiResponse<
      PaginationResponse<{
        clientId: string;
        name: string;
        totalSpended: number;
      }>
    >
  >;
  listConsumers(): Promise<
    ApiResponse<
      PaginationResponse<{ clientId: string; name: string; totalItems: number }>
    >
  >;
  findTop10ConsumedItemsByType(): Promise<
    ApiResponse<
      PaginationResponse<
        {
          petType: string;
          productName: string;
          totalAmount: number;
          itemId: string;
        }[]
      >
    >
  >;
  findTop10ConsumedItemsByRace(): Promise<
    ApiResponse<
      PaginationResponse<
        {
          petRace: string;
          productName: string;
          totalAmount: number;
          itemId: string;
        }[]
      >
    >
  >;
}
