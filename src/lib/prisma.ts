import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"


let connectionString = `${process.env.DATABASE_URL}`;
connectionString = connectionString.replace('sslmode=require', 'sslmode=require&uselibpqcompat=true');
const adapter = new PrismaPg({ connectionString })
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
