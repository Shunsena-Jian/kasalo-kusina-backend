import 'dotenv/config';
import express from 'express';
import userRoutes from './src/routes/users.js';
import recipeRoutes from './src/routes/recipes.js';
import authRoutes from './src/routes/auth.js';
import {sessionMiddleware} from './src/middlewares/session.js';

const app = express();
const PORT = process.env.PORT;

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth',  authRoutes);
app.use(sessionMiddleware);

app.get('/',  (req, res) => {
    res.send('Hi world');
});

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
})