import express from 'express';

import { updateUserRules } from '../rules/auth.ts';
import {
    getUserDetails,
    deleteUser,
    updateUser,
} from '../controllers/userController.ts';
import { isAuthenticated, isSameUser } from '../middlewares/session.ts';

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
