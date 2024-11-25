import type { ItemDto } from "../../dto";
import type {ApiResponse, PaginationResponse} from "../../responses"
export interface IServicesService{
  listServices(): Promise<ApiResponse<PaginationResponse<ItemDto>>>
  updateService(partialServiceDto: Partial<ItemDto>, serviceId: string): Promise<ApiResponse<void>>
  deleteService(serviceId: string): Promise<ApiResponse<void>>
  registerService(service: ItemDto): Promise<ApiResponse<void>>
}
