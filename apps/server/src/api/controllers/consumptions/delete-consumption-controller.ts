import { IHttp } from "@core/interfaces";
import { DeleteConsumptionUseCase } from "@core/use-cases";
import { consumptionRepository } from "apps/server/src/database";

type Body = {
  consumptionId: string;
};
export class DeleteConsumptioncontroller {
  async handle(http: IHttp) {
    const { consumptionId } = http.getBody<Body>();
    const useCase = new DeleteConsumptionUseCase(consumptionRepository);
    const response = await useCase.execute({ consumptionId });
    return response;
  }
}
