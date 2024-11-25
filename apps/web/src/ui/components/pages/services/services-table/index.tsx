import type { ItemDto, Service } from "@core";
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
import { useServicesTable } from "./use-services-table";
import { useRef } from "react";
import type { DrawerRef } from "../../../commons/drawer/types/drawer-ref";
import { Pen, Trash } from "lucide-react";
import { AlertDialog } from "../../../commons/alert-modal";
import { UpdateServiceForm } from "../update-service-form";
import { Drawer } from "../../../commons/drawer";
type ServicesTableProps = {
  isLoading: boolean;
  services: Service[];
  onUpdateService?: VoidFunction;
  handleDeleteService: (serviceId: string) => void;
};

export const ServicesTable = ({
  isLoading,
  services,
  onUpdateService,
  handleDeleteService,
}: ServicesTableProps) => {
  const drawerRef = useRef<DrawerRef>(null);
  const {
    serviceBeingEditted,
    handleCancelEditting,
    handleDrawerClose,
    handleEditServiceButtonClick,
    handleUpdateServiceFormSubmit,
  } = useServicesTable({
    services,
    drawerRef,
    onUpdateService,
  });
  return (
    <>
      <Table
        aria-label="Tabela de Serviços"
        shadow="none"
        selectionMode="none"
      >
        <TableHeader>
          <TableColumn key="name">NOME</TableColumn>
          <TableColumn key="price">PREÇO</TableColumn>
          <TableColumn
            key="actions"
            className="flex justify-center items-center"
          >
            ACOES
          </TableColumn>
        </TableHeader>
        <TableBody
          items={services}
          isLoading={isLoading}
          loadingContent={<Spinner color="primary" label="Carregando..." />}
          emptyContent="Nenhum serviço cadastrado"
        >
          {(service) => (
            <TableRow key={service.id}>
              <TableCell key="name">{service.name}</TableCell>
              <TableCell key="price">{service.price}</TableCell>
              <TableCell
                key="actions"
                className="flex items-center justify-center"
              >
                <Tooltip content="Editar serviço">
                  <Button
                    size="sm"
                    className="bg-transparent hover:bg-sky-400 text-gray-400 hover:text-red-50 hover:transition-all transition-all duration-100 border-zinc-400 min-w-10"
                    onClick={() => handleEditServiceButtonClick(service)}
                  >
                    {" "}
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
                    handleDeleteService(service.id || "");
                  }}
                >
                  Voce tem certeza?
                </AlertDialog>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer trigger={null} ref={drawerRef}>
        {() =>
          serviceBeingEditted && (
            <UpdateServiceForm
              onSubmit={async () => {
                await handleUpdateServiceFormSubmit();
                handleDrawerClose();
              }}
              onCancel={handleCancelEditting}
              service={serviceBeingEditted}
            />
          )
        }
      </Drawer>
    </>
  );
};
