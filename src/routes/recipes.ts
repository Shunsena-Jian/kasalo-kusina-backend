import express from 'express';
import { createRecipeRules } from '../rules/recipe.js';
import { isAuthenticated } from "../middlewares/session.js";

import {
    createRecipe, getRecipe, listRecipes
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/:id', getRecipe);
router.get('/', listRecipes);
router.post('/', ...createRecipeRules, isAuthenticated, createRecipe);

export default router;
