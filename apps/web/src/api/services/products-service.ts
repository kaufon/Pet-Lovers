import type {
  IProductsService,
  IapiClient,
  ItemDto,
  PaginationResponse,
  Product,
} from "@core";

export const ProductsService = (apiClient: IapiClient): IProductsService => {
  return {
    async listProducts() {
      return await apiClient.get<PaginationResponse<ItemDto>>("/products");
    },
    async registerProduct(product: Product) {
      return await apiClient.post("/products", product.dto);
    },
    async updateProduct(
      partialProductDto: Partial<ItemDto>,
      productId: string,
    ) {
      return await apiClient.put(`/products/${productId}`, partialProductDto);
    },
    async deleteProduct(productId: string) {
      return await apiClient.delete("/products", { productId: productId });
    },
  };
};

