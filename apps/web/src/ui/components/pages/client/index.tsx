import type { ClientDto } from "@core/dtos";
import { Input } from "@nextui-org/input";

type ClientPageProps = {
  client: ClientDto;
};

export const ClientPage = ({ client }: ClientPageProps) => {
  return (
    <div className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <div className="flex flex-row gap-4">
        <Input
          isReadOnly
          value={client.nome}
          size="lg"
          label="Nome"
          className="flex-1"
        />
        <Input
          isReadOnly
          value={client.nomeSocial}
          size="lg"
          label="Nome Social"
          className="flex-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input isReadOnly value={client.email} size="lg" label="E-mail" />
        <Input isReadOnly value={client.endereco.rua} size="lg" label="Rua" />
        <Input
          isReadOnly
          value={client.endereco.cidade}
          size="lg"
          label="Cidade"
        />
        <Input
          isReadOnly
          value={client.endereco.bairro}
          size="lg"
          label="Bairro"
        />
        <Input
          isReadOnly
          value={client.endereco.numero}
          size="lg"
          label="Número"
        />
        <Input
          isReadOnly
          value={client.endereco.informacoesAdicionais}
          size="lg"
          label="Informações Adicionais"
        />
      </div>

      <div>
        <label className="block text-gray-700">Telefones</label>
        {client.telefones.map((tel) => (
          <Input
            key={tel.id}
            isReadOnly
            value={`${tel.ddd}-${tel.numero}`}
            size="lg"
            className="mt-2 w-64 overflow-ellipsis"
          />
        ))}
      </div>
    </div>
  );
};
