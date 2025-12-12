import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Configs
import { corsOptions } from "./config/cors.js";
import mongoDB from './config/mongodb.js';

// Middlewares
import { sessionMiddleware } from './middlewares/session.js';
import apiResponse from './middlewares/responseHandlers.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

// Routes
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';

mongoDB().then(() => {
    console.log('MongoDB connected');
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(apiResponse);
app.use(sessionMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
});
