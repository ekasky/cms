import { Request, Response, NextFunction } from 'express';
import { registerUser } from './services/auth';


export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const result = await registerUser(req.body);

        // If we got to this point the registration was successful
        res.status(201).json(result);

    } catch(error) {
        // Passes errors to the global error handler
        next(error);
    }

};