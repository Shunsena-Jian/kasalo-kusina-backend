import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import RecipeService from '../services/recipeService.js';

export async function createRecipe(req: Request, res: Response) {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.error(errors.array(), 400);
    }

    try {
        const userId = req.session.userId!;

        return res.success(await RecipeService.createRecipe(userId, req.body));
    } catch (error) {
        return res.error(error);
    }
}

export async function getRecipe(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (! id) {
            return res.error('Recipe ID is required', 400);
        }

        const recipe = await RecipeService.getRecipe(id);
        if (! recipe) {
            return res.error('Recipe not found', 404);
        }

        return res.success(recipe);
    } catch (error) {
        return res.error(error);
    }
}

export async function listRecipes(req: Request, res: Response) {
    try {
        const query = req.query.q as string;
        console.log(query);
        return res.success(await RecipeService.listRecipes(query));
    } catch (error) {
        return res.error(error);
    }
}