import type { ItemDto } from '../../dto'
import { Entity } from './entity'

export type ItemProps = {
  name: string
  price: number
  type: "PRODUCT" | "SERVICE"
  ordersCount: number
}

export abstract class Item extends Entity<ItemProps> {
  constructor(dto: ItemDto, id?: string) {
    super(
      {
        name: dto.name,
        type: dto.type,
        price: dto.price,
        ordersCount: dto.ordersCount ?? 0,
      },
      id,
    )
  }

  set ordersCount(ordersCount: number) {
    this.props.ordersCount = ordersCount
  }

  get ordersCount() {
    return this.props.ordersCount
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }


  get type() {
    return this.props.type
  }
}
