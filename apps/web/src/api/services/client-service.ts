import type {
  IClientsService,
  IapiClient,
  PaginationResponse,
  ApiResponse,
  ClientDto,
} from "@core"; // Adjust based on your project structure

export const ClientsService = (apiClient: IapiClient): IClientsService => {
  return {
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
