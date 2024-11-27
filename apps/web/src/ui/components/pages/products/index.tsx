"use client";
import { Pen, Trash } from "lucide-react";
import React from "react";
import { RegisterProductForm } from "./register-product-formn"; 
import { ProductsTable } from "./products-table"; 
import { useProductsPage } from "./use-products-page"; 
import { Drawer } from "../../commons/drawer";
import { Button } from "@nextui-org/button";

export const ProductsPage = () => { 
  const {
    products, 
    isFetching,
    handleUpdateProduct, 
    handleRegisterProductFormSubmit, 
    handleDeleteProductAlertDialogConfirm, 
  } = useProductsPage(); 

  return (
    <>
      <div className="space-y-4">
        <div className="flex w-full items-center p-4 justify-center">
          <Drawer trigger={<Button color="primary" size="lg" radius="lg" className="w-60">Adicionar Produto</Button>}>
            {(closeDrawer) => (
              <RegisterProductForm
                onSubmit={async () => {
                  await handleRegisterProductFormSubmit();
                  closeDrawer();
                }}
                onCancel={closeDrawer}
              />
            )}
          </Drawer>
        </div>
        
        <ProductsTable
          handleDeleteProduct={handleDeleteProductAlertDialogConfirm} 
          isLoading={isFetching}
          products={products} 
          onUpdateProduct={handleUpdateProduct} 
        />
      </div>
    </>
  );
};

