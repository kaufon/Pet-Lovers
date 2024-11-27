"use client";
import { CACHE } from "apps/web/src/constants";
import { useApi } from "../../../hooks/use-api";
import { useCache } from "../../../hooks/use-cache";
import { useState } from "react";
import { Client } from "@core";

export function useDashboard() {
  const { clientService } = useApi();
  async function fetchClients() {
    const response = await clientService.listClients();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body;
  }
  const { data, refetch, isFetching } = useCache({
    fetcher: fetchClients,
    key: CACHE.clients.key,
  });
  const clients = data ? data.items.map((client) => Client.create(client)) : [];
  const itemsCount = data ? data.itemCount : 0;
  async function handleRegisterClientFormSubmit(){
    refetch()
  }
  async function handleUpdateClient(){
    refetch()
  }
  async function handleDeleteClient(clientId: string) {
    const response = await clientService.deleteClient(clientId);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    refetch();
  }
  return {
    isFetching,
    clients,
    handleDeleteClient,
    handleUpdateClient,
    handleRegisterClientFormSubmit,
  };
}
