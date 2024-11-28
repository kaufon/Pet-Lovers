import { z } from "zod";
import { nameSchema } from "./name-schema";
import { dateSchema } from "./dateSchema";
import { numberSchema } from "./numberSchema";
export const documentSchema = z.object({
  value: numberSchema,
  emissionDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date(),
  ),
});
