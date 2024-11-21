type ConsumptionProps = {
  clientId: string;
  itemId: string;
  amount: number;
};
export class Consumption {
  readonly clientId: string;
  readonly itemId: string;
  readonly amount: number;
  private constructor(props: ConsumptionProps) {
    this.clientId = props.clientId;
    this.itemId = props.itemId;
    this.amount = props.amount;
  }
  static create(dto: ConsumptionProps) {
    return new Consumption({
      amount: dto.amount,
      itemId: dto.itemId,
      clientId: dto.clientId,
    });
  }
  get dto() {
    return {
      clientID: this.clientId,
      amount: this.amount,
      itemId: this.itemId,
    };
  }
}
