import rateLimit from "express-rate-limit";
import { ENVIRONMENTS } from "../constants/environments.js";

const shouldSkip = () => process.env.NODE_ENV !== ENVIRONMENTS.TYPE_PRODUCTION;

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    skip: shouldSkip,
    message: {
        success: false,
        errors: ['Too many requests. Please try again later.'],
    },
});

export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    skip: shouldSkip,
    message: {
        success: false,
        errors: ['Too many login attempts. Please try again in an hour.'],
    },
});