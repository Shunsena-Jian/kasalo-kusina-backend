import express from 'express';

import {asyncHandler} from "../utils/asyncHandler.js";

import { loginUserRules } from '../rules/auth.js';
import { createUserRules } from '../rules/user.js';

import { isAuthenticated } from '../middlewares/session.js';

import {
    loginUser,
    logoutUser,
    createUser,
    getCurrentUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/login', ...loginUserRules, asyncHandler(loginUser));
router.post('/register', ...createUserRules, asyncHandler(createUser));
router.get('/me', isAuthenticated, asyncHandler(getCurrentUser));
router.post('/logout', asyncHandler(logoutUser));

export default router;
