import { Item } from '../abstracts/item'
import type { ItemDto } from '../../dto' 

export class Product extends Item {
  static create(dto: ItemDto): Product {
    return new Product(dto, dto.id)
  }

  update(dto: ItemDto): Product {
    return Product.create({ ...this.dto, ...dto })
  }

  get dto(): ItemDto {
    return {
      id: this.id,
      name: this.name,
      price: this.props.price,
      type: 'PRODUCT',
      ordersCount: this.ordersCount,
    }
  }
}
