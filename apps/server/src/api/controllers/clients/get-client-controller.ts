import { HTTP_STATUS_CODE } from "@core/constants";
import type { IHttp } from "@core/interfaces";
import { GetClientUseCase } from "@core/use-cases";
import { clientRepository } from "apps/server/src/database";
type Params = {
  clientId: string;
};
export class GetClientController {
  async handle(http: IHttp) {
    const { clientId } = http.getRouteParams<Params>();
    const useCase = new GetClientUseCase(clientRepository);
    const response = await useCase.execute({ clientId });
    return http.send(response, HTTP_STATUS_CODE.ok);
  }
}
