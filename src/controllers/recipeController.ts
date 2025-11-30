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

    } catch (error) {
        return res.error(error);
    }
}