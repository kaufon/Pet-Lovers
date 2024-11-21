import type { ItemDto } from '../../dto' 
import { Item } from '../abstracts/item'

export class Service extends Item {
  static create(dto: ItemDto): Service {
    return new Service(dto, dto.id)
  }

  update(dto: ItemDto): Service {
    return Service.create({ ...this.dto, ...dto })
  }

  get dto(): ItemDto {
    return {
      id: this.id,
      name: this.name,
      price: this.props.price,
      type: 'SERVICE',
      ordersCount: this.ordersCount,
    }
  }
}
