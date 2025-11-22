import { body } from 'express-validator';

export const loginUserRules = [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Enter a password'),
];
