import { Request, Response } from 'express';
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';

const apiRequestLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10, 
    handler: function (req: Request, res: Response) {
        return res.status(429).json({
            error: 'You sent too many requests. Please wait a while then try again'
        })
    }
})

export { apiRequestLimiter };
