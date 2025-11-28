import express from 'express';

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

router.post('/login', ...loginUserRules, loginUser);
router.post('/register', ...createUserRules, createUser);
router.get('/me', isAuthenticated, getCurrentUser);
router.post('/logout', logoutUser);

export default router;
