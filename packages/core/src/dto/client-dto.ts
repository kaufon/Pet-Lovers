import type { CpfDto } from "./cpf-dto"
import type { PetDto } from "./pets-dto"
import type { PhoneDto } from "./phone-dto"
import type { RgDto } from "./rg-dto"

export type ClientDto = {
  id?: string
  name: string
  socialName: string
  cpf: CpfDto
  pets: PetDto[]
  rgs: RgDto[]
  phones: PhoneDto[]
}
