import express from 'express';

import {isAdmin, isAuthenticated} from '../middlewares/session.js';
import {
    listUsers,
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', isAuthenticated, isAdmin, listUsers);

export default router;