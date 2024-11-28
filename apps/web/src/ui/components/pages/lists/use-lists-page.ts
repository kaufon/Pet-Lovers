import { useState } from "react";
import { useApi } from "../../../hooks/use-api";

export function useListsPage() {
  const { clientService, consumptionsService } = useApi();
  const [consumers, setConsumers] = useState([]);
  const [spenders, setSpenders] = useState([]);
  const [top10ConsumersByType, setTop10ConsumersByType] = useState([]);
  const [top10ConsumersByRace, setTop10ConsumersByRace] = useState([]);
  const [mostConsumedItems, setMostConsumedItems] = useState([]);
  async function fetchConsumers() {
    const response = await clientService.listConsumers();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body.items;
  }
  async function fetchSpenders() {
    const response = await clientService.listSpenders();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body.items;
  }
  async function fetchTop10ConsumersByType() {
    const response = await clientService.findTop10ConsumedItemsByType();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body.items;
  }
  async function fetchTop10ConsumersByRace() {
    const response = await clientService.findTop10ConsumedItemsByRace();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body.items;
  }
  async function fetchMostConsumedItems() {
    const response = await consumptionsService.findMostConsumedItems();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body.items;
  }
  return {
    fetchConsumers, 
    fetchSpenders, 
    fetchTop10ConsumersByType, 
    fetchTop10ConsumersByRace, 
    fetchMostConsumedItems
  }
}
