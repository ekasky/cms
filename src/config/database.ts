import { Pool } from 'pg';
import { env } from './config';
import { logger } from '../utils/logger';

// Create a new PostgreSQL connection pool
// Will allow for multiple connections to help spread the load
export const dbConnectionPool = new Pool({
    user: env.DB.DB_USER,
    host: env.DB.DB_HOST,
    database: env.DB.DB_DATABASE,
    password: env.DB.DB_PASSWORD,
    port: env.DB.DB_PORT

});

// Factory function to connect to the db
export const connectDatabase = async () => {

    try {

        await dbConnectionPool.query('SELECT 1');
        logger.info('Connected to PostgreSQL database');

    } catch(error) {
        logger.error('Failed to connect to PostgreSQL', error);
        throw error;
    }

};