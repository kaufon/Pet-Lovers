import type { ItemDto, Product } from "@core";
import { type RefObject, useState } from "react";
import type { DrawerRef } from "../../../commons/drawer/types/drawer-ref";
import type { Item } from "packages/core/src/domain/abstracts/item";

type useProductsTableProps = {
  products: ItemDto[];
  drawerRef: RefObject<DrawerRef>;
  onUpdateProduct?: VoidFunction;
  onProductSelectionChange?: (productId: string) => void;
};

export function useProductsTable({
  products,
  drawerRef,
  onProductSelectionChange,
  onUpdateProduct,
}: useProductsTableProps) {
  const [productBeingEdited, setProductBeingEdited] =
    useState<Product | null>();

  function handleEditProductButtonClick(product: Product) {
    setProductBeingEdited(product);
    drawerRef.current?.open();
  }

  function handleDrawerClose() {
    setProductBeingEdited(null);
  }

  function handleCancelEditing() {
    setProductBeingEdited(null);
    drawerRef.current?.close();
  }

  function handleUpdateProductFormSubmit() {
    setProductBeingEdited(null);
    drawerRef.current?.close();
    if (onUpdateProduct) onUpdateProduct();
  }

  return {
    productBeingEdited,
    handleCancelEditing,
    handleUpdateProductFormSubmit,
    handleEditProductButtonClick,
    handleDrawerClose,
  };
}

