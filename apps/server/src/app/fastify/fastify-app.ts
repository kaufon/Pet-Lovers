import type { IServerApp } from "@core/interfaces";
import Cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";
import { ClientsRoutes, ProductsRoutes, ServicesRoutes } from "./routes";
import { ConsumptionsRoutes } from "./routes/consumptions-routes";

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance;
  constructor() {
    this.app = Fastify();
    this.app.register(Cors, { origin: "*" });
    this.registerRoutes();
  }
  startServer(): void {
    this.app
      .listen({ port: 3333 })
      .then(() => {
        console.log(`📟 Server running on port: http://localhost:3333`);
      })
      .catch((error) => {
        console.error(`❌ Error on start server: ${error}`);
        process.exit(1);
      });
  }
  stopServer(): void { }
  private registerRoutes() {
    this.app.register(ConsumptionsRoutes,{prefix: "/consumptions"})
    this.app.register(ClientsRoutes,{prefix: "/clients"})
    this.app.register(ProductsRoutes, { prefix: "/products" });
    this.app.register(ServicesRoutes, {prefix: "/services"})
  }
}
