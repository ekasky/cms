import 'dotenv/config';
import express from 'express';
import { pinoHttp } from 'pino-http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { PORT } from './config/config';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {

    // Creates a new Express.js application instance.
    const app = express();

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

    // Middleware to parse incoming JSON requests.
    // This allows the application to handle JSON data sent in the request body.
    app.use(express.json());
    
    // Middleware to parse incoming URL-encoded requests.
    // 'extended: true' allows parsing of rich objects and arrays encoded in the URL-encoded format.
    // This is necessary for handling form submissions and other URL-encoded data.
    app.use(express.urlencoded({ extended: true }));
    
    // Starts the Express.js server and listens for incoming requests on the specified PORT.
    app.listen(PORT, () => {
    
        logger.info(`Server is running at http://localhost:${PORT}`);

    });

};

startServer();