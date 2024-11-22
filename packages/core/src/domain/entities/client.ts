import type { ClientDto } from "../../dto";
import { Entity } from "../abstracts";
import { Cpf } from "./cpf";
import { Pet } from "./pet";
import { Phone } from "./phone";
import { Rg } from "./rg";

type ClientProps = {
  name: string;
  socialName: string;
  cpf: Cpf;
  pets: Pet[];
  rgs: Rg[];
  phones: Phone[];
};

export class Client extends Entity<ClientProps> {
  static create(dto: ClientDto) {
    return new Client(
      {
        name: dto.name,
        socialName: dto.socialName,
        cpf: Cpf.create(dto.cpf),
        pets: dto.pets.map(Pet.create),
        rgs: dto.rgs.map(Rg.create),
        phones: dto.phones.map(Phone.create),
      },
      dto.id,
    );
  }

  update(partialDto: Partial<ClientDto>) {
    return Client.create({
      ...this.dto,
      ...partialDto,
    });
  }

  get name(): string {
    return this.props.name;
  }

  get socialName(): string {
    return this.props.socialName;
  }

  get cpf(): Cpf {
    return this.props.cpf;
  }

  get pets(): Pet[] {
    return this.props.pets;
  }

  get rgs(): Rg[] {
    return this.props.rgs;
  }

  get phones(): Phone[] {
    return this.props.phones;
  }
  get dto(): ClientDto {
    return {
      id: this.id,
      name: this.props.name,
      socialName: this.props.socialName,
      cpf: this.props.cpf.dto,
      pets: this.props.pets.map((pet) => pet.dto),
      rgs: this.props.rgs.map((rg) => rg.dto),
      phones: this.props.phones.map((phone) => phone.dto),
    };
  }
}
