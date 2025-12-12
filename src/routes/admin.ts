import express from 'express';

import {asyncHandler} from "../utils/asyncHandler.js";

import {isAdmin, isAuthenticated, isUserActive, isSuperAdmin} from '../middlewares/session.js';
import { listUsers, updateUser } from '../controllers/adminController.js';

import { deleteUser, getUserDetails } from '../controllers/userController.js';
import {adminUpdateUserRules} from "../rules/admin.js";

const router = express.Router();

router.get('/users', isAuthenticated, isAdmin, isUserActive, asyncHandler(listUsers));
router.get('/user/:id', isAuthenticated, isAdmin, asyncHandler(getUserDetails));
router.patch('/user/:id', ...adminUpdateUserRules, isAuthenticated, isAdmin, asyncHandler(updateUser));
router.delete('/:id', isAuthenticated, isSuperAdmin, asyncHandler(deleteUser));

export default router;