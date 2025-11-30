import express from 'express';

import { createCategoryRules } from '../rules/category.js';

import { isModerator } from "../middlewares/session.js";

import {
    createCategory, listCategories
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', listCategories)
router.post('/', ...createCategoryRules, isModerator, createCategory);

export default router;