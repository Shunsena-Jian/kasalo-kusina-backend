import express from 'express';

import { loginUserRules } from '../rules/auth.js';
import { createUserRules } from '../rules/user.js';

import {
    loginUser,
    logoutUser,
    createUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/login', ...loginUserRules, loginUser);
router.post('/register', ...createUserRules, createUser);
router.post('/logout', logoutUser);

export default router;
