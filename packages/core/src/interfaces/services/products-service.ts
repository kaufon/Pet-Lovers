import type { ItemDto } from "../../dto";
import type { ApiResponse, PaginationResponse } from "../../responses";

export interface IProductsService {
  listProducts(): Promise<ApiResponse<PaginationResponse<ItemDto>>>;
  updateProduct(partialProductDto: Partial<ItemDto>, productId: string): Promise<ApiResponse<void>>;
  deleteProduct(productId: string): Promise<ApiResponse<void>>;
  registerProduct(product: ItemDto): Promise<ApiResponse<void>>;
}

