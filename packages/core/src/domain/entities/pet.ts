import type { PetDto } from "../../dto";
import { Entity } from "../abstracts";

export class Pet {
  readonly name: string;
  readonly type: string;
  readonly race: string;
  readonly gender: string;

  constructor(name: string, type: string, race: string, gender: string) {
    this.name = name;
    this.type = type;
    this.race = race;
    this.gender = gender;
  }

  
  get petInfo(): { name: string; type: string; race: string; gender: string } {
    return {
      name: this.name,
      type: this.type,
      race: this.race,
      gender: this.gender,
    };
  }

  
  static create(dto: PetDto) {
    return new Pet(dto.name, dto.type, dto.race, dto.gender);
  }

  
  update(partialDto: Partial<PetDto>) {
    return Pet.create({
      ...this.petInfo,
      ...partialDto,
    });
  }

  
  get dto(): PetDto {
    return {
      name: this.name,
      type: this.type,
      race: this.race,
      gender: this.gender,
    };
  }
}

