import type { Product } from "@core";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useProductsTable } from "./use-products-table";
import { useRef } from "react";
import type { DrawerRef } from "../../../commons/drawer/types/drawer-ref";
import { Pen, Trash } from "lucide-react";
import { AlertDialog } from "../../../commons/alert-modal";
import { UpdateProductForm } from "../update-product-form";
import { Drawer } from "../../../commons/drawer";

type ProductsTableProps = {
  isLoading: boolean;
  products: Product[];
  onUpdateProduct?: VoidFunction;
  handleDeleteProduct: (productId: string) => void;
};

export const ProductsTable = ({
  isLoading,
  products,
  onUpdateProduct,
  handleDeleteProduct,
}: ProductsTableProps) => {
  const drawerRef = useRef<DrawerRef>(null);
  const {
    productBeingEdited,
    handleCancelEditing,
    handleDrawerClose,
    handleEditProductButtonClick,
    handleUpdateProductFormSubmit,
  } = useProductsTable({
    products,
    drawerRef,
    onUpdateProduct,
  });

  return (
    <>
      <Table
        aria-label="Tabela de Produtos"
        shadow="none"
        selectionMode="none"
      >
        <TableHeader>
          <TableColumn key="name">Nome</TableColumn>
          <TableColumn key="price">Preco</TableColumn>
          <TableColumn
            key="actions"
            className="flex justify-center items-center"
          >
            Acoes
          </TableColumn>
        </TableHeader>
        <TableBody
          items={products}
          isLoading={isLoading}
          loadingContent={<Spinner color="primary" label="Carregando..." />}
          emptyContent="Nenhum produto cadastrado"
        >
          {(product) => (
            <TableRow key={product.id}>
              <TableCell key="name">{product.name}</TableCell>
              <TableCell key="price">{product.price}</TableCell>
              <TableCell
                key="actions"
                className="flex items-center justify-center"
              >
                <Tooltip content="Editar produto">
                  <Button
                    size="sm"
                    className="bg-transparent hover:bg-sky-400 text-gray-400 hover:text-red-50 hover:transition-all transition-all duration-100 border-zinc-400 min-w-10"
                    onClick={() => handleEditProductButtonClick(product)}
                  >
                    <Pen size={25} />
                  </Button>
                </Tooltip>
                <AlertDialog
                  trigger={
                    <Button
                      size="sm"
                      className="bg-transparent hover:bg-sky-400 text-gray-400 hover:text-red-50 hover:transition-all transition-all duration-100 border-zinc-400 min-w-10"
                    >
                      <Trash size={25} />
                    </Button>
                  }
                  onConfirm={() => {
                    handleDeleteProduct(product.id || "");
                  }}
                >
                  Você tem certeza?
                </AlertDialog>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer trigger={null} ref={drawerRef}>
        {() =>
          productBeingEdited && (
            <UpdateProductForm
              onSubmit={async () => {
                await handleUpdateProductFormSubmit();
                handleDrawerClose();
              }}
              onCancel={handleCancelEditing}
              product={productBeingEdited}
            />
          )
        }
      </Drawer>
    </>
  );
};

