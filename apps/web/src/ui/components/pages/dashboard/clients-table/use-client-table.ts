import type { Client, ClientDto } from "@core";
import type { RefObject } from "react";
import { useState } from "react";
import type { DrawerRef } from "../../../commons/drawer/types/drawer-ref";
type useClientTableProps = {
  drawerRef: RefObject<DrawerRef>;
  consumerRef: RefObject<DrawerRef>;
  clients: ClientDto[];
  onUpdateClients?: VoidFunction;
  onClientSelectionChange?: (clientId: string) => void;
};
export function useClientTable({
  drawerRef,
  clients,
  onUpdateClients,
  onClientSelectionChange,
  consumerRef,
}: useClientTableProps) {
  const [clientBeingEditted, setClientBeingEditted] = useState<Client | null>(
    null,
  );
  const [clientConsuming, setClientConsuming] = useState<string | null>(null);

  function handleClientEditSelection(client: Client) {
    setClientBeingEditted(client);
    drawerRef.current?.open();
  }
  function handleClientConsuming(clientId: string) {
    setClientConsuming(clientId);
    consumerRef.current?.open();
  }

  function handleDrawerClose() {
    setClientBeingEditted(null);
    setClientConsuming(null);
  }
  function handleCancelConsuming() {
    setClientConsuming(null);
    consumerRef.current?.close();
  }

  function handleCancelEditting() {
    setClientBeingEditted(null);
    drawerRef.current?.close();
  }
  function handleConsumeFormSubmit() {
    setClientConsuming(null);
    consumerRef.current?.close();
    if (onUpdateClients) onUpdateClients();
  }

  function handleClientEditFormSubmit() {
    setClientBeingEditted(null);
    drawerRef.current?.close();
    if (onUpdateClients) onUpdateClients();
  }
  return {
    handleCancelConsuming,
    handleClientConsuming,
    handleConsumeFormSubmit,
    clientConsuming,
    handleDrawerClose,
    clientBeingEditted,
    handleClientEditSelection,
    handleClientEditFormSubmit,
    handleCancelEditting,
  };
}
