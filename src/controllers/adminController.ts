import { type Request, type Response } from 'express';
import AdminService from '../services/adminService.js';
import { DEFAULT_LIMIT, ALLOWED_LIMITS } from "../constants/pagination.js";
import userService from "../services/userService.js";
import {USER_TYPES} from "../constants/users.js";
import {validationResult} from "express-validator";

export async function listUsers(req: Request, res:Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        let limit = parseInt(req.query.limit as string) || 10;
        if (! (ALLOWED_LIMITS as readonly number[]).includes(limit)) {
            limit = DEFAULT_LIMIT;
        }

        const result = await AdminService.listUsers(page, limit);

        res.success(result);
    } catch (error) {
        res.error(error);
    }
}

export async function updateUser(req: Request, res:Response) {
    try {
        const userId = req.params.id;

        if (! req.session ||
            ! userId ||
            (
                req.session.userType !== USER_TYPES.SUPER_ADMIN &&
                req.session.userType !== USER_TYPES.ADMIN &&
                req.session.userId === req.params.id
            )
        ) {
            return res.error('You are not authorized to perform this action', 403);
        }

        const errors = validationResult(req);
        if (! errors.isEmpty()) {
            return res.error(errors.array(), 400);
        }

        const response = await userService.updateUser(userId, req.body);

        if (! response) {
            return res.error('User not found or update failed', 404);
        }

        return res.success(response);
    } catch (error) {
        res.error(error);
    }
}