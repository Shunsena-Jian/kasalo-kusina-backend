import { body } from 'express-validator';

export const updateUserRules = [
    body('username').optional().notEmpty().withMessage('Username is required'),
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