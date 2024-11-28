import type { ConsumptionDto } from "../../dto";
import type { ApiResponse, PaginationResponse } from "../../responses";

export interface IConsumptionsService {
  listConsumptions(): Promise<ApiResponse<PaginationResponse<ConsumptionDto>>>;
  findMostConsumedItems(): Promise<
    ApiResponse<
      PaginationResponse<{
        id: string;
        name: string;
        type: string;
        amount: number;
      }>
    >
  >;

  updateConsumption(
    partialConsumptionsDto: Partial<ConsumptionDto>,
    consumptionId: string,
  ): Promise<ApiResponse<void>>;
  deleteConsumption(consumptionId: string): Promise<ApiResponse<void>>;
  registerConsumption(consumption: ConsumptionDto): Promise<ApiResponse<void>>;
}
