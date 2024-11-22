import type { ClientDto } from "@core/dto";
import type { IHttp } from "@core/interfaces";
import { UpdateClientUseCase } from "@core/use-cases/clients/update-client-use-case";
import { clientRepository } from "apps/server/src/database";

type Params = {
  clientId: string;
};

export class UpdateClientController {
  async handle(http: IHttp) {
    const clientDto = http.getBody<Partial<ClientDto>>();
    const { clientId } = http.getRouteParams<Params>();
    const useCase = new UpdateClientUseCase(clientRepository);
    const response = await useCase.execute({ clientId, clientDto });
    return response;
  }
}
