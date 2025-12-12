import express from 'express';

import {asyncHandler} from "../utils/asyncHandler.js";

import { createCategoryRules } from '../rules/category.js';

import { isModerator } from "../middlewares/session.js";

import {
    createCategory,
    listCategories
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', asyncHandler(listCategories))
router.post('/', ...createCategoryRules, isModerator, asyncHandler(createCategory));

export default router;