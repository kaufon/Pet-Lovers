import type { ClientDto } from "@core/dtos";
import type { RefObject } from "react";
import { useState } from "react";
import type { DrawerRef } from "../../../commons/drawer/types/drawer-ref";
type useClientTableProps = {
  drawerRef: RefObject<DrawerRef>;
};
export function useClientTable({ drawerRef }: useClientTableProps) {
  const [clientBeingDeleted, setClientBeingDeleted] =
    useState<ClientDto | null>(null);
  const [clientBeingEditted, setClientBeingEditted] =
    useState<ClientDto | null>(null);
  function handleClientDeleteSelection(client: ClientDto) {
    setClientBeingDeleted(client);
  }
  function handleClientEditSelection(client: ClientDto) {
    setClientBeingEditted(client);
    drawerRef.current?.open();
  }
  function handleDrawerClose() {
    setClientBeingEditted(null);
  }
  function handleCancelEditting() {
    setClientBeingEditted(null);
    drawerRef.current?.close();
  }
  function handleClientEditFormSubmit() {
    setClientBeingEditted(null);
    drawerRef.current?.close();
  }
  return {
    handleDrawerClose,
    clientBeingEditted,
    handleClientEditSelection,
    clientBeingDeleted,
    handleClientDeleteSelection,
    handleClientEditFormSubmit,
    handleCancelEditting,
  };
}
