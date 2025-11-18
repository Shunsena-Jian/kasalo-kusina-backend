import 'dotenv/config';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { REDIS } from '../constants/session.js';
import { ENVIRONMENTS } from '../constants/environments.js';
import { type Request, type Response, type NextFunction } from 'express';
import { USER_TYPES } from "../constants/users.js";

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error('REDIS_URL is not defined');
}
const redisClient = createClient({
    url: redisUrl,
});

redisClient
    .connect()
    .then(() => console.log('Redis connected'))
    .catch(console.error);

redisClient.on('error', (err) => {
    console.error('Redis Client Error: ', err);
});

const redisStore = new RedisStore({
    client: redisClient,
    prefix: REDIS.PREFIX,
});

const redisSecret = process.env.REDIS_SECRET;
if (!redisSecret) {
    throw new Error('REDIS_SECRET is not defined');
}

export const sessionMiddleware = session({
    store: redisStore,
    secret: redisSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === ENVIRONMENTS.TYPE_PRODUCTION,
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'lax',
    },
});

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.error('Forbidden: Please log in first.', 'Forbidden', 403);
    }
};

export const isSameUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId === req.params.id) {
        return next();
    } else {
        res.error(
            'Forbidden: You are not authorized to perform this action.',
            'Forbidden',
            403
        );
    }
};

export const isAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session
        && (req.session.userType === USER_TYPES.ADMIN || req.session.userType === USER_TYPES.SUPER_ADMIN)
    ) {
        return next();
    } else {
        res.error(
            'Forbidden: You are not authorized to perform this action.',
            'Forbidden',
            403
        );
    }
}
