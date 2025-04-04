import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient();

export const connectPrisma = async () => {
    try {
      await prisma.$connect();
      logger.info('Connected to PostgreSQL database via Prisma');
    } catch (error) {
      logger.error('Failed to connect to the database with Prisma:', error);
      throw error;
    }
  };