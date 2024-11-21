import type { RgDto } from "../../dto";
import { Document } from "../abstracts";

export class Rg extends Document {
  static create(dto: RgDto): Rg {
    return new Rg(dto.value, dto.emissionDate);
  }
  get dto(): RgDto {
    return {
      emissionDate: this.emissionDate,
      value: this.value,
    };
  }
}
