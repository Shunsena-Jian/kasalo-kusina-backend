require('dotenv').config();
const session = require('express-session');
const RedisStore = require('connect-redis');
const { createClient } = require('redis');
const { REDIS } = require('../constants/session');
const { ENVIRONMENTS } = require('../constants/environments');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect().catch(console.error);

redisClient.on('error', err => {
    console.error('Redis Client Error: '. err);
});

const redisStore = new RedisStore({
    client: redisClient,
    prefix: REDIS.PREFIX,
});

const sessionMiddleware = session({
    store: redisStore,
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === ENVIRONMENTS.TYPE_DEVELOPMENT,
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
    }
});

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        res.status(403).json({message: 'Forbidden: You are already logged in.'});
    } else {
        return next();
    }
};

const isGuest = (req, res, next) => {
    if (req.session && req.session.userId) {
        res.status(403).json({message: 'Forbidden: You are already logged in.'});
    } else {
        return next();
    }
};

module.exports = {
    sessionMiddleware,
    isAuthenticated,
    isGuest,
};