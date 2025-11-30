import { body } from 'express-validator';
import CategoryRepository from "../repositories/categoryRepository.js";

export const createCategoryRules = [
    body('name')
        .notEmpty()
        .withMessage('Category name is required')
        .custom(async (value) => {
            const category = await CategoryRepository.findCategoryWhere({ name: value });
            if (category) {
                return Promise.reject('Category name already exists');
            }
        }),
    body('slug')
        .notEmpty()
        .withMessage('Category slug is required')
        .custom(async (value) => {
            const category = await CategoryRepository.findCategoryWhere({ slug: value });
            if (category) {
                return Promise.reject('Category slug already exists');
            }
        }),
    body('description').optional(),
    body('image').optional(),
];