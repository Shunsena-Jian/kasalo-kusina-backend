import express from 'express';

import { updateUserRules } from '../rules/user.js';
import {
    getUserDetails,
    updateUser,
} from '../controllers/userController.js';
import { isAuthenticated, isSameUser } from '../middlewares/session.js';

const router = express.Router();

router.get('/:id', isAuthenticated, isSameUser, getUserDetails);

router.patch(
    '/:id',
    ...updateUserRules,
    isAuthenticated,
    isSameUser,
    updateUser
);

export default router;
