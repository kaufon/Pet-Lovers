import type { IHttp } from "@core/interfaces";
import { DeleteClientUseCase } from "@core/use-cases/clients/delete-client-use-case";
import { clientRepository } from "apps/server/src/database";

type Body = {
  clientId: string;
};
export class DeleteClientController {
  async handle(http: IHttp) {
    const { clientId } = http.getBody<Body>();
    const useCase = new DeleteClientUseCase(clientRepository);
    const response = await useCase.execute({ clientId });
    return response;
  }
}
