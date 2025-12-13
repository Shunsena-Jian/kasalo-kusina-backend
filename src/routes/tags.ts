import express from 'express';

import { asyncHandler } from "../utils/asyncHandler.js";

import {
    listTags
} from '../controllers/tagController.js';

const router = express.Router();

router.get('/', asyncHandler(listTags));

export default router;