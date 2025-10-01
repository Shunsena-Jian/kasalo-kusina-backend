require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth',  authRoutes);

app.get('/',  (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
})