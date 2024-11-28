import { Input } from "@nextui-org/input";
import type { ClientDto } from "@core";

type ClientPageProps = {
  client: ClientDto;
  consumptions: {
    itemId: string;
    itemName: string;
    totalAmount: number;
    totalSpent: number;
  }[];
};

export const ClientPage = ({ client, consumptions }: ClientPageProps) => {
  return (
    <div className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <div className="grid grid-cols-2 gap-4">
        <Input isReadOnly value={client.name} size="lg" label="Name" />
        <Input isReadOnly value={client.socialName} size="lg" label="Social Name" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input isReadOnly value={client.cpf.value} size="lg" label="CPF" />
        <Input
          isReadOnly
          value={new Date(client.cpf.emissionDate).toLocaleDateString()}
          size="lg"
          label="CPF Emission Date"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pets</h3>
        {client.pets.map((pet, index) => (
          <div key={pet.id || index} className="grid grid-cols-2 gap-4">
            <Input isReadOnly value={pet.name} size="lg" label="Pet Name" />
            <Input isReadOnly value={pet.type} size="lg" label="Type" />
            <Input isReadOnly value={pet.race} size="lg" label="Race" />
            <Input isReadOnly value={pet.gender} size="lg" label="Gender" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Phones</h3>
        {client.phones.map((phone, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Input isReadOnly value={phone.ddd} size="lg" label="DDD" />
            <Input isReadOnly value={phone.number} size="lg" label="Number" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">RGs</h3>
        {client.rgs.map((rg, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Consumptions</h3>
        {consumptions.map((consumption, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <Input isReadOnly value={consumption.itemId} size="lg" label="Item ID" />
            <Input isReadOnly value={consumption.itemName} size="lg" label="Item Name" />
            <Input
              isReadOnly
              value={consumption.totalAmount.toString()}
              size="lg"
              label="Total Amount"
            />
            <Input
              isReadOnly
              value={consumption.totalSpent.toFixed(2)}
              size="lg"
              label="Total Spent"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

