import {
  IClientsService,
  IapiClient,
  PaginationResponse,
  ApiResponse,
  ClientDto,
} from "@core";
import { m } from "framer-motion";

export const ClientsService = (apiClient: IapiClient): IClientsService => {
  return {
    async listConsumers() {
      return await apiClient.get("/clients/consumers");
    },
    async listSpenders() {
      return await apiClient.get("/clients/spenders");
    },
    async findTop10ConsumedItemsByType() {
      return await apiClient.get("/clients/pet/type");
    },
    async findTop10ConsumedItemsByRace() {
      return await apiClient.get("/clients/pet/race");
    },

    async getClientDetails(clientId) {
      return await apiClient.get<{
        client: ClientDto;
        consumptions: {
          itemId: string;
          itemName: string;
          totalAmount: number;
          totalSpent: number;
        }[];
      }>(`/clients/${clientId}`);
    },
    async listClients() {
      return await apiClient.get<PaginationResponse<ClientDto>>("/clients");
    },
    async registerClient(client: ClientDto) {
      return await apiClient.post<void>("/clients", client);
    },
    async updateClient(partialClientDto: Partial<ClientDto>, clientId: string) {
      return await apiClient.put<void>(
        `/clients/${clientId}`,
        partialClientDto,
      );
    },

    async deleteClient(clientId: string) {
      return await apiClient.delete("/clients", { clientId: clientId });
    },
  };
};
