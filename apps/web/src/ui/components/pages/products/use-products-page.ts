import { useState } from "react";
import { useApi } from "../../../hooks/use-api";
import { useCache } from "../../../hooks/use-cache";
import { CACHE } from "apps/web/src/constants";
import { Product } from "@core";

export function useProductsPage() {
  const { productsService } = useApi();
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchProducts() {
    const response = await productsService.listProducts();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body;
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchProducts,
    key: CACHE.products.key,
  });

  const products = data ? data.items.map((product) => Product.create(product)) : [];
  const itemsCount = data ? data.itemCount : 0;

  async function handleRegisterProductFormSubmit() {
    refetch();
  }

  async function handleUpdateProduct() {
    refetch();
  }

  async function handleDeleteProductAlertDialogConfirm(productId: string) {
    setIsDeleting(true);
    if (!productId) return;
    const response = await productsService.deleteProduct(productId);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    if (response.isSucess) {
      refetch();
    }
    setIsDeleting(false);
  }

  return {
    isFetching,
    isDeleting,
    products,
    handleUpdateProduct,
    handleDeleteProductAlertDialogConfirm,
    handleRegisterProductFormSubmit,
  };
}

