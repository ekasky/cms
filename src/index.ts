import 'dotenv/config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { Server } from 'http';
import { pinoHttp } from 'pino-http';
import authRouter from './features/auth/router';
import { PORT } from './config/config';
import { logger } from './utils/logger';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { createGlobalRateLimiter } from './middlewares/globalRateLimiter';
import { connectRedis } from './config/redis';
import { connectDatabase } from './config/database';
import { shutdown } from './utils/shutdown';
import { connectPrisma } from './config/prisma';

const startServer = async (): Promise<void> => {

    // Creates a new Express.js application instance.
    const app = express();


    // Connect to redis db
    // Connect to postgreSQL db
    await Promise.all([
        connectRedis(),
        //connectDatabase(),                    // No longer needed as prisma ORM will handle db interactions
        connectPrisma()
    ]);

    // Build rate limiter after Redis is ready
    const globalRateLimiter = createGlobalRateLimiter();

    // Middleware to log all incoming http requests
    // every incoming request (GET, POST, etc.) will be logged automatically!
    app.use(pinoHttp({ logger }));

    // Applies security-related HTTP headers to protect the application from common web vulnerabilities.
    // This middleware helps prevent XSS, clickjacking, and other security risks by setting appropriate headers.
    app.use(helmet());

    // This allows the application to accept requests from different origins (e.g., a frontend app running on a different domain or port).
    app.use(cors()); // Allow all origins by default.

    // This reduces the size of the response body, improving performance by decreasing the amount of data transferred.
    // It uses gzip or deflate compression, depending on the client's capabilities.
    app.use(compression());

    // This applies a global express-rate-limiter for 100 requests per IP per 15 minutes.
    // This applies to all routes, can be overidden if a smaller or larger number is needed.
    app.use(globalRateLimiter);

    // Middleware to parse incoming JSON requests.
    // This allows the application to handle JSON data sent in the request body.
    app.use(express.json());
    
    // Middleware to parse incoming URL-encoded requests.
    // 'extended: true' allows parsing of rich objects and arrays encoded in the URL-encoded format.
    // This is necessary for handling form submissions and other URL-encoded data.
    app.use(express.urlencoded({ extended: true }));

    // Health check route
    // Responds with a 200 OK code and a message "healthy" if the server is running properly
    app.get('/health-check', (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'healthy',
        });
    });

    // Define API routers here
    app.use('/api/auth', authRouter);

    // Global error handler
    // Catches all uncaught errors and sends a uniform and clean response
    app.use(globalErrorHandler);
    
    // Starts the Express.js server and listens for incoming requests on the specified PORT.
    const server: Server = app.listen(PORT, () => {
    
        logger.info(`Server is running at http://localhost:${PORT}`);

    });

    // Gracefully shutdown the server on shutdown signals
    process.on('SIGINT', async () => await shutdown(server));
    process.on('SIGTERM', async () => await shutdown(server));

};

startServer();