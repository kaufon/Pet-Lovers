import {z} from "zod"
export const dateSchema = z.coerce.date({message: "Data invalida"})
