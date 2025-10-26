import 'dotenv/config';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { REDIS } from '../constants/session.js'
import { ENVIRONMENTS } from '../constants/environments.js'

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.connect()
    .then(() => console.log('Redis connected'))
    .catch(console.error);

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
        res.error('Forbidden: Please log in first.', 403);
    }
};