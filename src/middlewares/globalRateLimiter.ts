import { rateLimit } from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,                               // 15-minutes
    max: 100,                                               // limit each ip to 100 requests per window
    message: 'Too many requests, please try again later.'
});