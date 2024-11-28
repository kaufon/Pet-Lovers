import {z} from "zod"
export const integerSchema = z.number({message:"tem que ser numer"}).min(1,{message:"Maior que 1"})
