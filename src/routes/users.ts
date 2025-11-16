import express from 'express';

import { updateUserRules } from '../rules/auth.js';
import {
    getUserDetails,
    deleteUser,
    updateUser,
} from '../controllers/userController.js';
import { isAuthenticated, isSameUser } from '../middlewares/session.js';

const router = express.Router();

router.get('/:id', isAuthenticated, getUserDetails);

router.patch(
    '/:id',
    ...updateUserRules,
    isAuthenticated,
    isSameUser,
    updateUser
);

router.delete('/:id', isAuthenticated, isSameUser, deleteUser);

export default router;
