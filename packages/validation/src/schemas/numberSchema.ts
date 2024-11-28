import {z} from "zod"
import { nameSchema } from "./name-schema"
export const numberSchema = nameSchema.regex(/^\d+$/,"Somente numeros")
