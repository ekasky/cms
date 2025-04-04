import { Server } from 'http';
import { logger } from './logger';
import { redisClient } from '../config/redis';
import { dbConnectionPool } from '../config/database';


export const shutdown = async (server: Server): Promise<void> => {

    logger.info('Gracefully shutting down...');

    await Promise.all([

        // Disconnect from redis
        redisClient.quit().catch(err => logger.error(`Redis shotdown error: ${err}`)),

        // Disconnect from postgreSQL database
        dbConnectionPool.end().catch(err => logger.error(`PostgreSQL shutdown error: ${err}`)),

        // Shutdown the HTTP express server
        new Promise((resolve, reject) => {
            
            server.close(err => {

                if(err) {
                    logger.error(`HTTP server shutdown error: ${err}`);
                    return reject(err);
                }

                resolve(undefined);

            })

        }),

    ]);

    logger.info('Shutdown complete. Exiting.');
    process.exit(0);

};