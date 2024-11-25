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
import { RegisterPetForm } from "./register-pet-form";
import { AlertModal } from "../../commons/alert-modal";

export const PetsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(true); 

  const openModal = (isRegister = true) => {
    setIsModalOpen(true);
    setIsRegister(isRegister);
  };

  const openAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button color="default" onClick={() => openModal(true)}>
        Adicionar Pet
      </Button>
      <Table selectionMode="single" shadow="md">
        <TableHeader>
          <TableColumn>ID do Dono</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Raça</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>ID do dono do Cão</TableCell>
            <TableCell>ID do Joaozinho</TableCell>
            <TableCell>Nome do Cão</TableCell>
            <TableCell>Raça do Cão</TableCell>
            <TableCell>Cachorro</TableCell>
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
      <RegisterPetForm
        isOpen={isModalOpen}
        isClosed={closeModal}
        isRegister={isRegister}
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        isClosed={closeAlertModal}
      />
    </>
  );
};


