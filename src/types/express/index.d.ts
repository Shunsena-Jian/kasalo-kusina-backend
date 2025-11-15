export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface ApiError {
    success: boolean;
    message: string;
    errors: unknown[];
}

declare global {
    namespace Express {
        export interface Response {
            success<T>(data: T, message?: string, statusCode?: number): void;
            error(errors: unknown, message?: string, statusCode?: number): void;
        }
    }
}
