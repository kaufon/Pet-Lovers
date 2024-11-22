import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";
import {
  DeleteServiceController,
  ListServicesController,
  RegisterServiceController,
  UpdateServiceController,
} from "apps/server/src/api/controllers";

export const ServicesRoutes = async (app: FastifyInstance) => {
  const listServicesController = new ListServicesController();
  const registerServiceController = new RegisterServiceController();
  const deleteServiceController = new DeleteServiceController();
  const updateServiceController = new UpdateServiceController()
  app.get("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return listServicesController.handle(http);
  });
  app.post("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return registerServiceController.handle(http);
  });
  app.delete("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return deleteServiceController.handle(http);
  });
  app.put("/:serviceId",async (request,response) => {
    const http = new FastifyHttp(request,response)
    return updateServiceController.handle(http)
  })
};
