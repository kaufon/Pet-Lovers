
import type {Client, Cpf, Pet, Phone, Rg} from "@prisma/client"


export type PrismaClient = Client & {
  cpf: Cpf
  pets: Pet[]
  rgs: Rg[]
  phones: Phone[]
}
