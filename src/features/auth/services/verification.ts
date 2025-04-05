import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { prisma } from '../../../config/prisma';

export const generateVerificationToken = async (tx: Prisma.TransactionClient, userId: string): Promise<string> => {

    const token: string = randomBytes(32).toString('hex');
    const expiresAt: Date = new Date(Date.now() + 15 * 60 * 1000);
  
    await tx.verificationToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  
    return token;

};