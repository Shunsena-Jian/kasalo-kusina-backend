import express from 'express';
import {body} from 'express-validator';
import { getUserDetails, createUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

const createUserRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().isLength({min:8}).withMessage('Password must be at least 8 characters long'),
]

// Get User Details
router.get('/:id', getUserDetails);

router.post('/register', ...createUserRules, createUser);

router.delete('/:id', deleteUser)

export default router;