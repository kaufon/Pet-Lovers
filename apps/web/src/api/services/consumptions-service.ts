import type {
  Consumption,
  ConsumptionDto,
  IConsumptionsService,
  IapiClient,
  PaginationResponse,
} from "@core";

export const ConsumptionsService = (
  apiClient: IapiClient,
): IConsumptionsService => {
  return {
    async findMostConsumedItems() {
      return await apiClient.get("/consumptions/most-consumed");
    },
    async listConsumptions() {
      return await apiClient.get<PaginationResponse<ConsumptionDto>>(
        "/consumptions",
      );
    },
    async registerConsumption(consumption: Consumption) {
      return await apiClient.post("/consumptions", consumption.dto);
    },
    async updateConsumption(
      partialConsumptionDto: Partial<ConsumptionDto>,
      consumptionId: string,
    ) {
      return await apiClient.put(
        `/consumptions/${consumptionId}`,
        partialConsumptionDto,
      );
    },
    async deleteConsumption(consumptionId: string) {
      return await apiClient.delete("/consumptions", {
        consumptionId: consumptionId,
      });
    },
  };
};
