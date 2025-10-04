require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const userRoutes = require('./src/routes/users');
const recipeRoutes = require('./src/routes/recipes');
const authRoutes = require('./src/routes/auth');
// const sessionMiddleware = require('./middlewares/session');

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth',  authRoutes);
// app.use(sessionMiddleware);

app.get('/',  (req, res) => {
    res.send('Hi world');
});

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
})