import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiError, FieldConflictError } from '../utils/ApiError';

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    // Log the error on the server for better debugging capabilies
    // This info will not be sent to the client
    logger.error(err);

    // Handle any FieldConflict errors here
    if(err instanceof FieldConflictError) {

        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            fields: err.fields
        });

    }
    // Handle all generic ApiError responses here
    else if(err instanceof ApiError) {

        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });

    } 
    // Send a uniform, clean, and vauge error response back to the client
    else {
        
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });

    }

};