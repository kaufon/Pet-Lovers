import { ConsumptionDto } from "../../dto";
import { Entity } from "../abstracts";

type ConsumptionProps = {
  id?: string;
  clientId: string;
  itemId: string;
  amount: number;
  price?: number;
};
export class Consumption extends Entity<ConsumptionProps> {
  static create(dto: ConsumptionProps) {
    return new Consumption(
      {
        amount: dto.amount,
        itemId: dto.itemId,
        clientId: dto.clientId,
        price: dto.price,
      },
      dto.id,
    );
  }
  update(dto: Partial<ConsumptionDto>): Consumption {
    return Consumption.create({ ...this.dto, ...dto });
  }
  get amount(): number {
    return this.props.amount;
  }
  get price(): number {
    return this.props.price || 0;
  }
  get itemId(): string {
    return this.props.itemId;
  }
  get clientId(): string {
    return this.props.clientId;
  }
  get dto() {
    return {
      id: this.id,
      clientId: this.props.clientId,
      amount: this.props.amount,
      itemId: this.props.itemId,
      price: this.props.price,
    };
  }
}
