import express from 'express';

import { createUserRules, loginUserRules, updateUserRules } from '../rules/auth.js';
import { getUserDetails, createUser, loginUser, logoutUser, deleteUser, updateUser } from '../controllers/userController.js';
import { isAuthenticated, isSameUser } from "../middlewares/session.js";

const router = express.Router();

router.get('/:id', isAuthenticated, getUserDetails);

router.post('/login', ...loginUserRules, loginUser);
router.post('/register', ...createUserRules, createUser);
router.post('/logout', logoutUser);

router.patch('/:id', ...updateUserRules, isAuthenticated, isSameUser, updateUser);

router.delete('/:id', isAuthenticated, isSameUser, deleteUser)

export default router;