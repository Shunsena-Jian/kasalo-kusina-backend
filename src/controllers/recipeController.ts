import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import RecipeService from '../services/recipeService.js';

export async function createRecipe(req: Request, res: Response) {
    try {
        const userId = req.session.userId!;


    } catch (error) {
        res.error(error);
    }
}