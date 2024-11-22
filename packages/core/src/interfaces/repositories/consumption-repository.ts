
import type { Consumption } from "../../domain";

export interface IConsumptionRepository{
  add(consumption: Consumption): Promise<void>
  fiindMostConsumedItems(): Promise<{id:string,name:string,type:string,amount:number}[]>
  findMany(): Promise<Consumption[]>
  findById(consumptionId:string): Promise<Consumption | null>
  delete(consumptionId:string): Promise<void>
  update(consumption:Consumption): Promise<void>
}
