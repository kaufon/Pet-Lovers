import {
  DeleteClientController,
  GetClientController,
  ListClientController,
  ListMostConsumedByRaceController,
  ListMostConsumedByTypeController,
  ListTopConsumersControllers,
  ListTopSpenderController,
  RegisterClientController,
  UpdateClientController,
} from "apps/server/src/api/controllers";
import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";

export const ClientsRoutes = async (app: FastifyInstance) => {
  const getClientController = new GetClientController()
  const listClientController = new ListClientController();
  const registerClientcontroller = new RegisterClientController();
  const deleteClientcontroller = new DeleteClientController();
  const updateClientcontroller = new UpdateClientController();
  const listtopConsumerscontrller = new ListTopConsumersControllers();
  const listTopSpendersController = new ListTopSpenderController();
  const listMostConsumedByRace = new ListMostConsumedByRaceController();
  const listMostConsumedByType = new ListMostConsumedByTypeController();
  app.get("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return listClientController.handle(http);
  });
  app.get("/:clientId", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return getClientController.handle(http);
  })
  app.get("/consumers", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return listtopConsumerscontrller.handle(http);
  });
  app.get("/spenders", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return listTopSpendersController.handle(http);
  });
  app.get("/pet/race", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return listMostConsumedByRace.handle(http);
  });
  app.get("/pet/type",async (request,response)=>{
    const http = new FastifyHttp(request,response)
    return listMostConsumedByType.handle(http)
  });
  app.post("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return registerClientcontroller.handle(http);
  });
  app.delete("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return deleteClientcontroller.handle(http);
  });
  app.put("/:clientId", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return updateClientcontroller.handle(http);
  });
};
