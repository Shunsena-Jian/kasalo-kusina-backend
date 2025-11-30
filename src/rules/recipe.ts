import { body } from 'express-validator';
import CategoryRepository from "../repositories/categoryRepository.js";

export const createRecipeRules = [
    body('title').notEmpty().isString().withMessage('Title is required'),
    body('description').notEmpty().isString().withMessage('Description is required'),

    body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),
    body('ingredients.*.name').notEmpty().isString().withMessage('Ingredient name is required'),
    body('ingredients.*.quantity').notEmpty().isNumeric().withMessage('Ingredient quantity must be a number'),
    body('ingredients.*.unit').notEmpty().isString().withMessage('Ingredient unit is required'),

    body('instructions').isArray({ min: 1 }).withMessage('Instructions must be a non-empty array'),
    body('instructions.*.step').notEmpty().isNumeric().withMessage('Instruction step must be a number'),
    body('instructions.*.text').notEmpty().isString().withMessage('Instruction text must be a string'),
    body('instructions.*.image').optional().isString().withMessage('Instruction image must be a string'),

    body('images').optional().isArray().withMessage('Images must be an array'),
    body('images.*').optional().isString().withMessage('Image must be a string URL'),

    body('prep_time_min').notEmpty().isNumeric().withMessage('Preparation time must be a number'),
    body('cook_time_min').notEmpty().isNumeric().withMessage('Cooking time must be a number'),
    body('servings').notEmpty().isNumeric().withMessage('Servings must be a number'),
    body('difficulty').notEmpty().isString().withMessage('Difficulty must be a string'),

    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('tags.*').isMongoId().withMessage('Tags must be valid Mongo IDs'),

    body('categories').optional().isArray().withMessage('Categories must be an array'),
    body('categories.*').isMongoId().withMessage('Categories must be valid Mongo IDs')
        .custom(async (value) => {
            const category = await CategoryRepository.findCategoryWhere({ _id: value });
            if (! category) {
                throw new Error(`Category with ID: ${value} does not exist`);
            }
            return true;
        })
];