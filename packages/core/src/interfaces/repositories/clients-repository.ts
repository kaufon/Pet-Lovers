import type { Pet, Client } from "../../domain";

export interface IClientsRepository {
  add(client: Client): Promise<void>;
  findTop10Consumers(): Promise<{ clientId: string; name: string; totalItems: number }[]>;
  findTop5Spenders(): Promise<{ clientId: string; name: string; totalSpended: number }[]>;
  addPet(pet: Pet, ownerId: string): Promise<void>;
  findMany(): Promise<Client[]>;
  findById(clientId: string): Promise<Client | null>;
  delete(clientId: string): Promise<void>;
  update(client: Client): Promise<void>;
}
