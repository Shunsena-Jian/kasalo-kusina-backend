import 'dotenv/config';
import express from 'express';

import adminRoutes from './routes/admin.js';
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import { sessionMiddleware } from './middlewares/session.js';

import mongoDB from './config/mongodb.js';
import apiResponse from './middlewares/responseHandlers.js';

// Connect to MongoDB
mongoDB().then(() => {
    console.log('MongoDB connected');
});

const app = express();
app.use(express.json());
app.use(apiResponse);

const PORT = process.env.PORT || 3000;

app.use(sessionMiddleware);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
});
