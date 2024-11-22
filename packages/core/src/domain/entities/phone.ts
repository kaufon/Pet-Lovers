import type { PhoneDto } from "../../dto" 

export class Phone {
  private constructor(
    readonly ddd: string,
    readonly number: string,
  ) {}

  static create(dto: PhoneDto): Phone {
    return new Phone(dto.ddd, dto.number)
  }

  get value(): string {
    return `+${this.ddd} ${this.number}`
  }
  get dto():PhoneDto{
    return{
      ddd: this.ddd,
      number: this.number
    }
  }
}
