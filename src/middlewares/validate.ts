import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {

    try {

        schema.parse(req.body);
        next();

    } catch(error: any) {

        // If Zod validation fails, respond with clean error
        const issues = error.errors?.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
        })) || [];

        return next(new ApiError(400, 'Validation error', issues));

    }

};