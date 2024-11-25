import { NextServerApiClient } from "../../api/next/clients";
import { ClientsService, ServicesService } from "../../api/services";

const nextApiClient = NextServerApiClient();

nextApiClient.setBaseUrl("http://localhost:3333");
export function useApi() {
  return {
    clientService: ClientsService(nextApiClient),
    servicesService: ServicesService(nextApiClient),
  };
}
