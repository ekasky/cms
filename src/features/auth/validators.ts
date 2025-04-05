import { z } from 'zod';

export const registerUserSchema = z.object({

    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(20, { message: 'Username must be at most 20 characters long' }),
    password: z.string()
        .min(15, { message: 'Password must be at least 15 characters long' })
        .max(64, { message: 'Password must be at most 64 characters long' })
        .refine((password) => /^[\x20-\x7E]*$/.test(password), {
            message: 'Password can only contain standard letters, numbers, spaces, and symbols.'
        }),
    first_name: z.string().min(1, { message: 'First name is required' }).max(75, { message: 'First name must be at most 75 characters' }),
    last_name: z.string().min(1, { message: 'Last name is required' }).max(75, { message: 'Last name must be at most 75 characters' })

}).strict();