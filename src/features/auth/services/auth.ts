import argon2 from 'argon2';
import { prisma } from '../../../config/prisma';
import { ApiError, FieldConflictError } from '../../../utils/ApiError';
import { AuthProvider } from '@prisma/client';
import { RegisterDto } from '../validators';
import { pwnedPassword } from 'hibp';
import { sendAccountVerificationEmail } from './email';

export const registerUser = async (data: RegisterDto) => {

    const { username, email, password, first_name, last_name }: RegisterDto = data;

    // === 1. Ensure that the username and/or email address are not already in use ===
    const [existingUsername, existingEmail] = await Promise.all([
        prisma.user.findUnique({ where: { username } }),
        prisma.user.findUnique({ where: { email } })
    ]);

    // If we find a existing user respond with a conflict error
    if (existingUsername && existingEmail) {
        throw new FieldConflictError(['username', 'email']);
    } else if (existingUsername) {
        throw new FieldConflictError(['username']);
    } else if (existingEmail) {
        throw new FieldConflictError(['email']);
    }

    // === 2. Check if the password is a known compromised password ===
    const pwndCount: number = await pwnedPassword(password);

    if(pwndCount > 0) {
        throw new ApiError(400, 'This password has been exposed in previous data breaches. Please choose a diffrent password.');
    }
    
    // === 3. Hash the password for safe database storage ===
    let hashedPassword: string;
    
    try {
        hashedPassword = await argon2.hash(password);
    } catch(error) {
        throw new ApiError(500, 'Something went wrong. Please try again.');
    }

    // === 4. Save the new user to the Users table in the database ===

    let newUser;

    try {

        newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                first_name,
                last_name,
                provider: AuthProvider.LOCAL
            }
        });

    } catch(error) {
        throw new ApiError(500, 'Failed to create user. Please try again.');
    }

    // === 5. Send a inital acocunt verification email ===

    try {
        await(sendAccountVerificationEmail({
            to: newUser.email,
            verificationLink: 'https://yourdomain.com/verify-email?token=12345' // Placeholder will replace with real link
        }))
    } catch(error) {
        throw new ApiError(400, 'There was a problem sending the verification email. Please try again shortly.');
    }

    // === 6. Return a success message if registered successfully ===
    return {
        success: true,
        message: 'User registered successfully',
        user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            created_at: newUser.created_at
        }
    }

};