import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import CategoryService from '../services/categoryService.js';
import UserService from "../services/userService.js";
import CategoryRepository from "../repositories/categoryRepository.js";

export async function listCategories(req: Request, res: Response) {
    try {
        return res.success(await CategoryService.listCategories());
    } catch (error) {
        res.error(error);
    }
}

export async function createCategory(req: Request, res: Response) {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.error(errors.array(), 400);
    }

    try {
        const result = await CategoryRepository.insertCategory(req.body);
        res.success(result);
    } catch (error) {
        res.error(error);
    }
}