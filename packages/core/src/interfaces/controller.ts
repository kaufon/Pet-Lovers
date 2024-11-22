import type {IHttp} from './IHttp'
export interface IController{
  handle(http: IHttp): Promise<unknown>
}
