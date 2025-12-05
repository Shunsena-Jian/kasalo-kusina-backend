import { type CorsOptions } from 'cors';

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (! origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};