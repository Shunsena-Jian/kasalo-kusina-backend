import { body } from "express-validator";
import {USER_STATUSES, USER_TYPES} from "../constants/users.js";

export const adminUpdateUserRules = [
    body('user_status')
        .notEmpty()
        .withMessage('User status is required')
        .isIn(Object.values(USER_STATUSES)),
    body('user_type')
        .notEmpty()
        .withMessage('User type is required')
        .isIn(Object.values(USER_TYPES)),
];