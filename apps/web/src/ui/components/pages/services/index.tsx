"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";
import { RegisterServiceForm } from "./register-service-form";
import { AlertModal } from "../../commons/alert-modal";

export const ServicesPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlertModalOpen, setAlertModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true); // Track whether we're registering or updating

  const closeModal = () => setModalOpen(false);
  const openModal = (isRegisterMode: boolean = true) => {
    setModalOpen(true);
    setIsRegister(isRegisterMode);
  };

  const openAlertModal = () => setAlertModalOpen(true);
  const closeAlertModal = () => setAlertModalOpen(false);

  return (
    <>
      <Button color="default" onClick={() => openModal(true)}>
        Adicionar Serviço
      </Button>
      <Table selectionMode="single" shadow="md">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Preço</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>ID do serviço</TableCell>
            <TableCell>Nome do serviço</TableCell>
            <TableCell>Preço do serviço</TableCell>
            <TableCell>
              <div className="flex flex-row gap-3 text-zinc-400">
                <Tooltip content="Editar">
                  <Pen onClick={() => openModal(false)} />
                </Tooltip>
                <Tooltip content="Deletar">
                  <Trash onClick={openAlertModal} />
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <RegisterServiceForm
        isOpen={isModalOpen}
        isClosed={closeModal}
        isRegister={isRegister} // Passing the register/update mode
      />
      <AlertModal isOpen={isAlertModalOpen} isClosed={closeAlertModal} />
    </>
  );
};


