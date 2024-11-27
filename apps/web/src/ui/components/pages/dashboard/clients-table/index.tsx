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
import { EyeIcon, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { DrawerRef } from "../../../commons/drawer/types/drawer-ref";
import { useClientTable } from "./use-client-table";
import type { Client } from "@core";
import { AlertDialog } from "../../../commons/alert-modal";

type ClientTableProps = {
  isLoading: boolean;
  clients: Client[];
  onUpdateClient?: VoidFunction;
  handleDeleteClient: (clientId: string) => void;
};
export const ClientTable = ({
  onUpdateClient,
  isLoading,
  clients,
  handleDeleteClient,
}: ClientTableProps) => {
  const drawerRef = useRef<DrawerRef>(null);
  return (
    <>
      <Table aria-label="Banana" selectionMode="none" shadow="md">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Nome Social</TableColumn>
          <TableColumn>CPF</TableColumn>
          <TableColumn>Pets</TableColumn>
          <TableColumn>Rgs</TableColumn>
          <TableColumn>Telefones</TableColumn>
          <TableColumn className="text-center">Acoes</TableColumn>
        </TableHeader>
        <TableBody
          items={clients}
          isLoading={isLoading}
          loadingContent={<Spinner color="primary" label="Carregando..." />}
          emptyContent="Nenhum cliente cadastrado"
        >
          {(client) => (
            <TableRow key={client.id}>
              <TableCell> {client.name}</TableCell>
              <TableCell> {client.socialName}</TableCell>
              <TableCell>{client.cpf.value}</TableCell>
              <TableCell>
                {client.pets.length > 0
                  ? client.pets.map((pet) => <div key={pet.id}>{pet.name}</div>)
                  : "Nenhum Pet registrado"}
              </TableCell>
              <TableCell>
                {client.rgs.length > 0
                  ? client.rgs.map((rg) => <div key={rg.value}>{rg.value}</div>)
                  : "Nenhum Pet registrado"}
              </TableCell>

              <TableCell>
                {client.phones.length > 0
                  ? client.phones.map((cell) => (
                    <div key={cell.number}>{cell.value}</div>
                  ))
                  : "Nenhum telefone registrado"}
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <AlertDialog
                  trigger={
                    <Button className="bg-transparent hover:bg-sky-400 text-gray-400 hover:text-red-50 hover:transition-all transition-all duration-100 border-zinc-400 min-w-10">
                      <Trash size={25} />
                    </Button>
                  }
                  onConfirm={() => {
                    handleDeleteClient(client.id || "");
                  }}
                >
                  Voce tem certeza?
                </AlertDialog>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
