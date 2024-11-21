import type { Item } from "@prisma/client";

export type PrismaService = Item & { consumption_number: number };
