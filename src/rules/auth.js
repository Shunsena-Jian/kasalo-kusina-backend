import {body} from "express-validator";

export const createUserRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().isLength({min:8}).withMessage('Password must be at least 8 characters long'),
]

export const loginUserRules = [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Enter a password'),
];

export const updateUserRules = [
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('new_password').notEmpty().isLength({ min: 8 }).withMessage('Password must be 8 characters long'),
];