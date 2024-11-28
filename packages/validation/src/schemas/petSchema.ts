import {z} from "zod"
import { nameSchema } from "./name-schema"
export const petSchema = z.object({
  name: nameSchema,
  type: nameSchema,
  race: nameSchema,
  gender: nameSchema,
})
