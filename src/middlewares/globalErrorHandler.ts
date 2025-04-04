import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    // Log the error on the server for better debugging capabilies
    // This info will not be sent to the client
    logger.error(err);

    // Send a uniform, clean, and vauge error response back to the client
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });

};