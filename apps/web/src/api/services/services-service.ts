import type {
  IServicesService,
  IapiClient,
  ItemDto,
  PaginationResponse,
  Service,
} from "@core";

export const ServicesService = (apiClient: IapiClient): IServicesService => {
  return {
    async listServices() {
      return await apiClient.get<PaginationResponse<ItemDto>>("/services");
    },
    async registerService(service: Service) {
      return await apiClient.post("/services", service.dto);
    },
    async updateService(
      partialServiceDto: Partial<ItemDto>,
      serviceId: string,
    ) {
      return await apiClient.put(`/services/${serviceId}`, partialServiceDto);
    },
    async deleteService(serviceId: string) {
      return await apiClient.delete("/services", { serviceId: serviceId });
    },
  };
};
