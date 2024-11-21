import type { Item } from "@prisma/client";

export type PrismaProduct = Item & {consumption_number: number}
