import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

declare module "express" {
  interface Request {
    myProp?: string;
  }
}

export interface igoogleData {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface iuser {
  id: string;
  email: string;
  password: string | null;
  name: string;
  role: string | null;
}
