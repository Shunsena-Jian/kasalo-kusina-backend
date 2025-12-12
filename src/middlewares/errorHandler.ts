import { type Request, type Response, type NextFunction } from 'express';

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err);

    const statusCode = 500;

    if (typeof res.error === 'function') {
        res.error(err, statusCode);
        return;
    }

    res.status(statusCode).json({
        success: false,
        errors: [err instanceof Error ? err.message : 'An unknown error occurred.'],
    });
}