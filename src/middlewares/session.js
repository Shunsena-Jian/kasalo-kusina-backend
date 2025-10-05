import 'dotenv/config';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { REDIS } from '../constants/session.js'
import { ENVIRONMENTS } from '../constants/environments.js'

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect().catch(console.error);

redisClient.on('error', err => {
    console.error('Redis Client Error: ', err);
});

const redisStore = new RedisStore({
    client: redisClient,
    prefix: REDIS.PREFIX,
});

export const sessionMiddleware = session({
    store: redisStore,
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === ENVIRONMENTS.TYPE_PRODUCTION,
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'lax',
    }
});

export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(403).json({message: 'Forbidden: You are already logged in.'});
    }
};

export const isGuest = (req, res, next) => {
    if (req.session && req.session.userId) {
        res.status(403).json({message: 'Forbidden: You are already logged in.'});
    } else {
        return next();
    }
};