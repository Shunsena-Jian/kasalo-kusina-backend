import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import CategoryService from '../services/categoryService.js';
import CategoryRepository from "../repositories/categoryRepository.js";

export async function listCategories(req: Request, res: Response) {
    return res.success(await CategoryService.listCategories());
}

export async function createCategory(req: Request, res: Response) {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.error(errors.array(), 400);
    }

    const result = await CategoryRepository.insertCategory(req.body);
    return res.success(result);
}