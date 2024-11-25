import type { ItemDto, Service } from "@core";
import  { type RefObject, useState } from "react";
import type { DrawerRef } from "../../../commons/drawer/types/drawer-ref";
import type { Item } from "packages/core/src/domain/abstracts/item";

type useServicesTableProps = {
  services: ItemDto[];
  drawerRef: RefObject<DrawerRef>;
  onUpdateService?: VoidFunction;
  onServiceSelectionChange?: (serviceId: string) => void;
};
export function useServicesTable({
  services,
  drawerRef,
  onServiceSelectionChange,
  onUpdateService,
}: useServicesTableProps) {
  const [serviceBeingEditted, setServicebeingEditted] =
    useState<Service | null>();
  function handleEditServiceButtonClick(service: Service) {
    setServicebeingEditted(service);
    drawerRef.current?.open();
  }
  function handleDrawerClose() {
    setServicebeingEditted(null);
  }

  function handleCancelEditting() {
    setServicebeingEditted(null);
    drawerRef.current?.close();
  }
  function handleUpdateServiceFormSubmit() {
    setServicebeingEditted(null);
    drawerRef.current?.close();
    if (onUpdateService) onUpdateService();
  }
  return {
    serviceBeingEditted,
    handleCancelEditting,
    handleUpdateServiceFormSubmit,
    handleEditServiceButtonClick,
    handleDrawerClose,
  };
}
