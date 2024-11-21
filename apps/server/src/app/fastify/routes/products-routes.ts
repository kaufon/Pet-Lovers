import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";

export const ProductsRoutes = async (app: FastifyInstance) => {
  app.get("/", async (request, response) => {
    return;
  });
};
