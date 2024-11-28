"use client";
import React, { useState, useEffect } from "react";
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
import { useListsPage } from "./use-lists-page";

export const ListsPage = () => {
  const [selectedList, setSelectedList] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    fetchConsumers,
    fetchSpenders,
    fetchTop10ConsumersByType,
    fetchTop10ConsumersByRace,
    fetchMostConsumedItems,
  } = useListsPage();

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setSelectedList(value);
    setIsLoading(true);
    let fetcher;

    switch (value) {
      case "mostwanted":
        fetcher = fetchMostConsumedItems;
        break;
      case "top5":
        fetcher = fetchSpenders;
        break;
      case "top10":
        fetcher = fetchConsumers;
        break;
      case "perRace":
        fetcher = fetchTop10ConsumersByRace;
        break;
      case "perType":
        fetcher = fetchTop10ConsumersByType;
        break;
      default:
        setData([]);
        setIsLoading(false);
        return;
    }

    try {
      const result = await fetcher();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTable = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (data.length === 0) {
      return <p>No data available.</p>;
    }

    switch (selectedList) {
      case "mostwanted":
        return (
          <Table aria-label="Produtos Mais Consumidos">
            <TableHeader>
              <TableColumn>Item</TableColumn>
              <TableColumn>Quantidade Consumida</TableColumn>
              <TableColumn>Tipo do item</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))}
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
              {data.map((client, index) => (
                <TableRow key={index}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.totalSpended}</TableCell>
                </TableRow>
              ))}
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
              {data.map((client, index) => (
                <TableRow key={index}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.totalItems}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "perRace":
        return (
          <Table aria-label="Mais Consumido por Raça">
            <TableHeader>
              <TableColumn>Raça</TableColumn>
              <TableColumn>Item </TableColumn>
              <TableColumn>Quantia Consumida </TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.petRace}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "perType":
        return (
          <Table aria-label="Mais Consumido por Tipo de Pet">
            <TableHeader>
              <TableColumn>Tipo de Pet</TableColumn>
              <TableColumn>Produto Mais Consumido</TableColumn>
              <TableColumn>Quantia Consumida </TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.petType}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Select label="Selecione a listagem" onChange={handleSelectChange}>
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
