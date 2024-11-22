import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";
import {
  DeleteProductController,
  ListProductsController,
  RegisterProductController,
  UpdatePRoductController,
} from "apps/server/src/api/controllers";

export const ProductsRoutes = async (app: FastifyInstance) => {
  const listProductsController = new ListProductsController();
  const registerProductController = new RegisterProductController();
  const deleteProductController = new DeleteProductController();
  const updateProductController = new UpdatePRoductController()
  app.get("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return listProductsController.handle(http);
  });
  app.post("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return registerProductController.handle(http);
  });
  app.delete("/", async (request, response) => {
    const http = new FastifyHttp(request, response);
    return deleteProductController.handle(http);
  });
  app.put("/:productId",async (request,response) => {
    const http = new FastifyHttp(request,response)
    return updateProductController.handle(http)
  })
};
