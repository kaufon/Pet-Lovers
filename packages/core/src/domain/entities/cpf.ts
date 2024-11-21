import type { CpfDto } from "../../dto";
import { Document } from "../abstracts";

export class Cpf extends Document {
  static create(dto: CpfDto): Cpf {
    return new Cpf(dto.value, dto.emissionDate);
  }
  get dto(): CpfDto {
    return {
      emissionDate: this.emissionDate,
      value: this.value,
    };
  }
}
