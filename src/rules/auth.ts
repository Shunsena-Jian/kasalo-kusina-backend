import { body } from 'express-validator';
import {USER_TYPES} from "../constants/users.js";

export const createUserRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().isEmail().withMessage('A valid email is required'),
    body('user_type')
        .notEmpty()
        .withMessage('User type is required')
        .isIn(Object.values(USER_TYPES))
        .withMessage('Invalid user type'),
    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

export const loginUserRules = [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Enter a password'),
];
