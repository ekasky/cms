import { randomBytes } from 'crypto';
import { prisma } from '../../../config/prisma';

export const generateVerificationToken = async (userId: string): Promise<string> => {

    const token: string = randomBytes(32).toString('hex');
    const expiresAt: Date = new Date(Date.now() + 15 * 60 * 1000);

    try {

        await prisma.verificationToken.create({
            data: {
                userId,
                token,
                expiresAt
            }
        });

    } catch(error) {

        throw new Error(`Failed to generate verification token`);

    }

    return token;

};