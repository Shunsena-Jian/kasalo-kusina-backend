import express from 'express';
import { createRecipeRules } from '../rules/recipe.js';
import { isAuthenticated } from "../middlewares/session.js";
import upload from '../middlewares/upload.js';

import {asyncHandler} from "../utils/asyncHandler.js";

import {
    createRecipe,
    getRecipe,
    listRecipes,
    featuredRecipes,
    newRecipes,
    highRatedRecipes
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/featured', asyncHandler(featuredRecipes));
router.get('/new', asyncHandler(newRecipes));
router.get('/high-rated', asyncHandler(highRatedRecipes));
router.get('/:id', asyncHandler(getRecipe));
router.get('/', asyncHandler(listRecipes));

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
