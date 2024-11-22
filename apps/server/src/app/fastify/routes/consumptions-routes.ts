import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";
import {
  DeleteConsumptioncontroller,
  ListConsumptionsController,
  ListMostConsumedItemsController,
  RegisterConsumptionController,
  UpdateConsumptionController,
} from "apps/server/src/api/controllers";

export const ConsumptionsRoutes = async (app: FastifyInstance) => {
  const listConsumptionsController = new ListConsumptionsController();
  const registerConsumptionController = new RegisterConsumptionController();
  const deleteConsumptionController = new DeleteConsumptioncontroller();
  const updateConsumptController = new UpdateConsumptionController();
  const listMostConsumedItems = new ListMostConsumedItemsController()
  app.get("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return listConsumptionsController.handle(http);
  });
  app.get("/most-consumed",async (request,response) =>{
    const http = new FastifyHttp(request,response)
    return listMostConsumedItems.handle(http)
  })
  app.post("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return registerConsumptionController.handle(http);
  });
  app.delete("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return deleteConsumptionController.handle(http);
  });
  app.put("/:consumptionId", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return updateConsumptController.handle(http);
  });
};
