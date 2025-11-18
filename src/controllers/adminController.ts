import { type Request, type Response } from 'express';
import AdminService from '../services/adminService.js';
import { DEFAULT_LIMIT, ALLOWED_LIMITS } from "../constants/pagination.js";

export async function listUsers(req: Request, res:Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        let limit = parseInt(req.query.limit as string) || 10;
        if (! ALLOWED_LIMITS.includes(limit)) {
            limit = DEFAULT_LIMIT;
        }

        const result = await AdminService.listUsers(page, limit);

        res.success(result, 'Successfully retrieved users', 200);
    } catch (error) {
        if (error instanceof Error) {
            res.error(error.message, 'Internal Server Error', 500);
        } else {
            res.error(
                'An unknown error occurred',
                'Internal Server Error',
                500
            );
        }
    }
}