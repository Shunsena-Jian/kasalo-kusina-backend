import express from 'express';
import { createRecipeRules } from '../rules/recipe.js';
import { isAuthenticated } from "../middlewares/session.js";
import upload from '../middlewares/upload.js';

import {
    createRecipe, getRecipe, listRecipes, featuredRecipes, newRecipes, highRatedRecipes
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/featured', featuredRecipes);
router.get('/new', newRecipes);
router.get('/high-rated', highRatedRecipes);
router.get('/:id', getRecipe);
router.get('/', listRecipes);

// Inline middleware to parse JSON strings from form-data before validation
const parseMultipartBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    ['ingredients', 'instructions', 'tags', 'categories'].forEach(field => {
        if (req.body[field] && typeof req.body[field] === 'string') {
            try {
                req.body[field] = JSON.parse(req.body[field]);
            } catch (e) {
            }
        }
    });
    next();
};

router.post('/', isAuthenticated, upload.single('image'), parseMultipartBody, ...createRecipeRules, createRecipe);

export default router;
