import {z} from "zod"
import { nameSchema } from "./name-schema"
import { numberSchema } from "./numberSchema"
export const phoneSchema = z.object({
  ddd: numberSchema,
  number: numberSchema
})
