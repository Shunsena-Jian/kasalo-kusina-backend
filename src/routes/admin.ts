import express from 'express';

import {isAdmin, isAuthenticated, isUserActive, isSuperAdmin} from '../middlewares/session.js';
import { listUsers, updateUser } from '../controllers/adminController.js';

import { deleteUser, getUserDetails } from '../controllers/userController.js';
import {adminUpdateUserRules} from "../rules/admin.js";

const router = express.Router();

router.get('/users', isAuthenticated, isAdmin, isUserActive, listUsers);
router.get('/user/:id', isAuthenticated, isAdmin, getUserDetails);
router.patch('/user/:id', ...adminUpdateUserRules, isAuthenticated, isAdmin, updateUser);
router.delete('/:id', isAuthenticated, isSuperAdmin, deleteUser);

export default router;