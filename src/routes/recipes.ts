import express from 'express';
import { createRecipeRules } from '../rules/recipe.js';
import { isAuthenticated } from "../middlewares/session.js";

import {
    createRecipe, getRecipe
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is GET recipes');
});

router.get('/:id', getRecipe);

router.post('/', ...createRecipeRules, isAuthenticated, createRecipe);

export default router;
