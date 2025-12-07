import { type Request, type Response, type NextFunction } from 'express';

function apiResponse(req: Request, res: Response, next: NextFunction): void {
    res.success = (data: unknown, statusCode = 200) => {
        res.status(statusCode).json({
            data,
        });
    };

    res.error = (input: string | Error | string[], statusCode = 500) => {
        let errors: string | string[] = 'An unknown error occurred.';

        if (input instanceof Error) {
            errors = input.message;
        } else if (typeof input === 'string') {
            errors = input;
        } else if (Array.isArray(input)) {
            errors = input as string[];
        } else if (input && typeof input === 'object' && 'message' in input) {
            errors = String((input as { message: unknown }).message)
        }

        res.status(statusCode).json({
            success: false,
            errors: Array.isArray(errors) ? errors : [errors],
        });
    }

    next();
}

export default apiResponse;
