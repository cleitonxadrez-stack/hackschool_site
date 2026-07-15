import { PrismaClient } from "@prisma/client";

// Evita múltiplas instâncias do Prisma Client em dev (hot reload) e em
// ambientes serverless (Vercel) reaproveita a conexão entre invocações.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
