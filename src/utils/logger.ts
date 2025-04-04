import pino from 'pino';
import { NODE_ENV } from '../config/config';

export const logger = pino({

    level: NODE_ENV === 'production' ? 'info' : 'debug',
    transport: NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
        }
    } : undefined // in production, output structured json to stdout

});