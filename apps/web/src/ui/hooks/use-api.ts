import { NextServerApiClient } from "../../api/next/clients";
import { ClientsService, ConsumptionsService, ProductsService, ServicesService } from "../../api/services";

const nextApiClient = NextServerApiClient();

nextApiClient.setBaseUrl("http://localhost:3333");
export function useApi() {
  return {

    clientService: ClientsService(nextApiClient),
    consumptionsService: ConsumptionsService(nextApiClient),
    servicesService: ServicesService(nextApiClient),
    productsService: ProductsService(nextApiClient)
  };
}
