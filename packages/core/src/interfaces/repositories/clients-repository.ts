import type { Pet, Client } from "../../domain";

export interface IClientsRepository {
  add(client: Client): Promise<void>;
  getClientDetails(clientId: string): Promise<{
    client: Client | null;
    consumptions: {
      itemId: string;
      itemName: string;
      totalAmount: number;
      totalSpent: number;
    }[];
  }>;
  findTop10ConsumedItemsByRace(): Promise<
    {
      petRace: string;
      productName: string;
      totalAmount: number;
      itemId: string;
    }[]
  >;
  findTop10ConsumedItemsByType(): Promise<
    {
      petType: string;
      productName: string;
      totalAmount: number;
      itemId: string;
    }[]
  >;
  findTop10Consumers(): Promise<
    { clientId: string; name: string; totalItems: number }[]
  >;
  findTop5Spenders(): Promise<
    { clientId: string; name: string; totalSpended: number }[]
  >;
  addPet(pet: Pet, ownerId: string): Promise<void>;
  findMany(): Promise<Client[]>;
  findById(clientId: string): Promise<Client | null>;
  delete(clientId: string): Promise<void>;
  update(client: Client): Promise<void>;
}
