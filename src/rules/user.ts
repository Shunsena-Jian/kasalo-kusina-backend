import { body } from 'express-validator';
import { USER_TYPES } from "../constants/users.js";
import UserRepository from "../repositories/userRepository.js";

export const createUserRules = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .custom(async (value) => {
            const user = await UserRepository.findUser({ username: value });
            if (user) {
                return Promise.reject('Username already exists');
            }
        }),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('A valid email is required')
        .custom(async (value) => {
            const user = await UserRepository.findUser({ email: value });
            if (user) {
                return Promise.reject('Email already exists');
            }
        }),
    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

export const updateUserRules = [
    body('username')
        .optional()
        .notEmpty()
        .withMessage('Username is required')
        .custom(async (value, { req }) => {
            const user = await UserRepository.findUser({ username: value });
            if (user && user.id !== req.params?.id) {
                return Promise.reject('Username already exists');
            }
        }),
    body('new_password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password must be 8 characters long'),
    body('old_password').custom((value, { req }) => {
        if (req.body.new_password && !value) {
            throw new Error('Old password is required with new password');
        }
        return true;
    }),
];