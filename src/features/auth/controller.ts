import { Request, Response, NextFunction } from 'express';
import { registerUser } from './services/auth';
import type { RegisterDto } from './validators';


export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const data: RegisterDto = req.body as RegisterDto;
        const result = await registerUser(data);

        // If we got to this point the registration was successful
        res.status(201).json(result);

    } catch(error) {
        // Passes errors to the global error handler
        next(error);
    }

};