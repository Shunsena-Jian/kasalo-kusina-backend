export interface ApiResponse<T> {
    data: T;
}

export interface ApiError {
    success: boolean;
    errors: unknown[];
}

declare global {
    namespace Express {
        export interface Response {
            success<T>(data: T, statusCode?: number): void;
            error(errors: unknown, statusCode?: number): void;
        }
    }
}
