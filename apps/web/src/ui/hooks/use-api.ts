import { NextServerApiClient } from "../../api/next/clients";
import { ClientsService } from "../../api/services";

const nextApiClient = NextServerApiClient();

nextApiClient.setBaseUrl("http://localhost:32831");
export function useApi() {
  return {
    clientService: ClientsService(nextApiClient),
  };
}
