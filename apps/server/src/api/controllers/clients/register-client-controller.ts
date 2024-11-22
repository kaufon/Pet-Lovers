import type { ClientDto } from "@core/dto";
import type { IHttp } from "@core/interfaces";
import { RegisterClientUseCase } from "@core/use-cases/clients/index";
import { clientRepository } from "apps/server/src/database";

export class RegisterClientController {
  async handle(http: IHttp) {
    const clientDto = http.getBody<ClientDto>();
    const useCase = new RegisterClientUseCase(clientRepository);
    const response = useCase.execute({ clientDto });
    return response;
  }
}
