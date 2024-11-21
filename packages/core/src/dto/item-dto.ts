export type ItemDto = {
  id?: string;
  name: string;
  type: "PRODUCT" | "SERVICE"
  price: number;
  ordersCount?: number;
};
