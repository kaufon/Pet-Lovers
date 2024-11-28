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
        <Input isReadOnly value={client.name} size="lg" label="Nome" />
        <Input
          isReadOnly
          value={client.socialName}
          size="lg"
          label=" Nome Social"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input isReadOnly value={client.cpf.value} size="lg" label="CPF" />
        <Input
          isReadOnly
          value={new Date(client.cpf.emissionDate).toLocaleDateString("pt-BR")}
          size="lg"
          label="  Data de emissao do CPF"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pets</h3>
        {client.pets.map((pet, index) => (
          <div key={pet.id || index} className="grid grid-cols-2 gap-4">
            <Input isReadOnly value={pet.name} size="lg" label="Nome do Pet" />
            <Input isReadOnly value={pet.type} size="lg" label="Tipo do Pet" />
            <Input isReadOnly value={pet.race} size="lg" label="Raca do Pet" />
            <Input
              isReadOnly
              value={pet.gender}
              size="lg"
              label="Genero do Pet"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Telefones</h3>
        {client.phones.map((phone, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Input isReadOnly value={phone.ddd} size="lg" label="DDD" />
            <Input isReadOnly value={phone.number} size="lg" label="Numero" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">RGs</h3>
        {client.rgs.map((rg, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Input isReadOnly value={rg.value} size="lg" label="Valor do Rg" />
            <Input
              isReadOnly
              value={new Date(rg.emissionDate).toLocaleDateString("pt-BR")}
              size="lg"
              label="Data de emissao do Rg"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Items Consumidos</h3>
        {consumptions.map((consumption, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <Input
              isReadOnly
              value={consumption.itemName}
              size="lg"
              label="Nome do Item"
            />
            <Input
              isReadOnly
              value={consumption.totalAmount.toString()}
              size="lg"
              label="Total consumido"
            />
            <Input
              isReadOnly
              value={consumption.totalSpent.toFixed(2)}
              size="lg"
              label="Total gasto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
