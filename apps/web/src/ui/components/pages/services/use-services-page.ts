import { useState } from "react";
import { useApi } from "../../../hooks/use-api";
import { useCache } from "../../../hooks/use-cache";
import { CACHE } from "apps/web/src/constants";
import { Service } from "@core";

export function useServicesPage() {
  const { servicesService } = useApi();
  const [isDeleting, setIsDeleting] = useState(false);
  async function fetchServices() {
    const response = await servicesService.listServices();
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    return response.body;
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchServices,
    key: CACHE.services.key,
  });
  const services = data ? data.items.map((service) => Service.create(service)) : [];
  const itemsCount = data ? data.itemCount : 0;
  async function handleRegisterServiceFormSubmit() {
    refetch();
  }
  async function handleUpdateService() {
    refetch();
  }
  async function handleDeleteServiceAlertDialogConfirm(serviceId:string) {
    setIsDeleting(true);
    if (!serviceId) return;
    const response = await servicesService.deleteService(serviceId);
    if (response.isFailure) {
      throw new Error(response.errorMessage);
    }
    if (response.isSucess) {
      refetch();
    }
    setIsDeleting(false);
  }
  return {
    isFetching,
    isDeleting,
    services,
    handleUpdateService,
    handleDeleteServiceAlertDialogConfirm,
    handleRegisterServiceFormSubmit,
  };
}
