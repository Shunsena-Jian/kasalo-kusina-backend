import express from 'express';

import {isAuthenticated, isModerator} from "../middlewares/session.js";

import {
    createRecipe
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is GET recipes');
});

router.post('/', isAuthenticated, isModerator, createRecipe);

export default router;
