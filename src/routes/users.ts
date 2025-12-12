import express from 'express';

import {asyncHandler} from "../utils/asyncHandler.js";

import { updateUserRules } from '../rules/user.js';
import {
    getUserDetails,
    updateUser,
} from '../controllers/userController.js';
import { isAuthenticated, isSameUser } from '../middlewares/session.js';

const router = express.Router();

router.get('/:id', isAuthenticated, isSameUser, asyncHandler(getUserDetails));

router.patch(
    '/:id',
    ...updateUserRules,
    isAuthenticated,
    isSameUser,
    asyncHandler(updateUser)
);

export default router;
