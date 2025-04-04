import 'dotenv/config';
import express from 'express';
import PinoHttp, { pinoHttp } from 'pino-http';
import { PORT } from './config/config';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {

    // Creates a new Express.js application instance.
    const app = express();

    // Middleware to log all incoming http requests
    // every incoming request (GET, POST, etc.) will be logged automatically!
    app.use(pinoHttp({ logger }));

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