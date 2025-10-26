import express from 'express';

import { createUserRules, loginUserRules } from '../rules/auth.js';
import { getUserDetails, createUser, loginUser, logoutUser, deleteUser } from '../controllers/userController.js';
import { isAuthenticated } from "../middlewares/session.js";

const router = express.Router();

router.post('/login', ...loginUserRules, loginUser);
router.post('/register', ...createUserRules, createUser);
router.post('/logout', logoutUser);

router.get('/:id', isAuthenticated, getUserDetails);



router.delete('/:id', isAuthenticated, deleteUser)

export default router;