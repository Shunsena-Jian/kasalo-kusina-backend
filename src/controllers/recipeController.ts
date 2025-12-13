import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import RecipeService from '../services/recipeService.js';
import Recipe from "../models/Recipe.js";

export async function createRecipe(req: Request, res: Response) {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.error(errors.array(), 400);
    }

    try {
        const userId = req.session.userId!;

        if (req.file) {
             req.body.image = `/uploads/${req.file.filename}`;
        }

        console.log(req.body);

        return res.success(await RecipeService.createRecipe(userId, req.body));
    } catch (error) {
        return res.error(error);
    }
}

export async function getRecipe(req: Request, res: Response) {
    const { id } = req.params;
    if (! id) {
        return res.error('Recipe ID is required', 400);
    }

    const recipe = await RecipeService.getRecipe(id);
    if (! recipe) {
        return res.error('Recipe not found', 404);
    }

    return res.success(recipe);
}

export async function listRecipes(req: Request, res: Response) {
    const query = req.query.q as string;
    return res.success(await RecipeService.listRecipes(query));
}

export async function featuredRecipes(req: Request, res: Response) {
    return res.success(await RecipeService.getFeaturedRecipes());
}

export async function newRecipes(req: Request, res: Response) {
    return res.success(await RecipeService.getNewRecipes());
}

export async function highRatedRecipes(req: Request, res: Response) {
    return res.success(await RecipeService.getHighRatedRecipes());
}