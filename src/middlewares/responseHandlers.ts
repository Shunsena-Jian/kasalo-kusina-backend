import { type Request, type Response, type NextFunction } from 'express';

function apiResponse(req: Request, res: Response, next: NextFunction) {
    res.success = (data, statusCode = 200) => {
        res.status(statusCode).json({
            data,
        });
    };

    res.error = (input, statusCode = 500) => {
        let errors = input;

        if (input instanceof Error) {
            errors = input.message;
        } else if (! input) {
            errors = 'An unknown error occurred.';
        }

        res.status(statusCode).json({
            success: false,
            errors: Array.isArray(errors) ? errors : [errors],
        });
    }

    return next();
}

export default apiResponse;
