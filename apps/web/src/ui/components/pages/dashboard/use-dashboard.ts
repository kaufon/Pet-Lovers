"use client";
import { CACHE } from "apps/web/src/constants";
import { useApi } from "../../../hooks/use-api";
import { useCache } from "../../../hooks/use-cache";
import { useState } from "react";

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
    refreshInterval: 3000,
    key: CACHE.client.key,
  });
  async function deleteClient(clientId: number) {
    const response = await clientService.deleteClient(clientId);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    refetch();
  }
  const clients = data ? data : [];
  return {
    clients,
    deleteClient,
    isLoading: isFetching,
  };
}
