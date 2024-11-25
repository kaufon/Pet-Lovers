"use client";
import {
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useState } from "react";

export const ListsPage = () => {
  const [selectedList, setSelectedList] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedList(value);
  };

  const renderTable = () => {
    switch (selectedList) {
      case "mostwanted":
        return (
          <Table aria-label="Produtos Mais Consumidos">
            <TableHeader>
              <TableColumn>Produto</TableColumn>
              <TableColumn>Quantidade Consumida</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Produto A</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Produto B</TableCell>
                <TableCell>80</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      case "top5":
        return (
          <Table aria-label="Top 5 Clientes que Mais Gastaram">
            <TableHeader>
              <TableColumn>Cliente</TableColumn>
              <TableColumn>Valor Gasto</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cliente 1</TableCell>
                <TableCell>R$ 500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cliente 2</TableCell>
                <TableCell>R$ 450</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      case "top10":
        return (
          <Table aria-label="Top 10 Clientes que Mais Consumiram">
            <TableHeader>
              <TableColumn>Cliente</TableColumn>
              <TableColumn>Quantidade Consumida</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cliente A</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cliente B</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      case "perRace":
        return (
          <Table aria-label="Mais Consumido por Raça">
            <TableHeader>
              <TableColumn>Raça</TableColumn>
              <TableColumn>Produto Mais Consumido</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Raça A</TableCell>
                <TableCell>Produto X</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Raça B</TableCell>
                <TableCell>Produto Y</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      case "perType":
        return (
          <Table aria-label="Mais Consumido por Tipo de Pet">
            <TableHeader>
              <TableColumn>Tipo de Pet</TableColumn>
              <TableColumn>Produto Mais Consumido</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cachorro</TableCell>
                <TableCell>Ração A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gato</TableCell>
                <TableCell>Ração B</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Select
        label="Selecione a listagem"
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        <SelectItem key="mostwanted">Produtos Mais Consumidos</SelectItem>
        <SelectItem key="top5">Top 5 Clientes que Mais Gastaram</SelectItem>
        <SelectItem key="top10">Top 10 Clientes que Mais Consumiram</SelectItem>
        <SelectItem key="perRace">Mais Consumido por Raça</SelectItem>
        <SelectItem key="perType">Mais Consumido por Tipo de Pet</SelectItem>
      </Select>
      {renderTable()}
    </>
  );
};
