
import type { Service } from "../../domain";

export interface IServicesRepository {
  add(service: Service): Promise<void>
  findMany(): Promise<Service[]>
  findById(serviceId:string): Promise<Service | null>
  delete(serviceId:string): Promise<void>
  update(service:Service): Promise<void>
}
