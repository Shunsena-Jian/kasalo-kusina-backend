import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/userService.js';

export async function getUserDetails(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.error('User ID is required', 'Bad Request', 400);
        }

        const user = await UserService.findUserById(userId);
        if (!user) {
            return res.error('User not found', 'Not Found', 404);
        }

        res.success(user, 'User details retrieved successfully');
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

export async function createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(errors.array(), 'Validation Error', 400);
    }

    try {
        const user = await UserService.createUser(req.body);

        if (user && req.session) {
            req.session.userId = user.id;
        }

        res.success(user, 'User created successfully', 201);
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

export async function loginUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(errors.array(), 'Validation Error', 400);
    }

    try {
        const email = req.body.email;
        const password = req.body.password;

        const response = await UserService.verifyUser(email, password);

        if (response) {
            req.session.userId = response.id;
            return res.success(response, 'Login successful', 200);
        }

        res.error('Invalid email or password', 'Unauthorized', 401);
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

export async function logoutUser(req: Request, res: Response) {
    try {
        if (req.session && req.session.userId) {
            req.session.destroy((err) => {
                if (err) {
                    if (err instanceof Error) {
                        return res.error(
                            err.message,
                            'Internal Server Error',
                            500
                        );
                    }
                    return res.error(
                        'An unknown error occurred',
                        'Internal Server Error',
                        500
                    );
                }

                res.success(null, 'User logged out successfully');
            });
        } else {
            res.success(null, 'User already logged out');
        }
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

export async function deleteUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.error('User ID is required', 'Bad Request', 400);
        }

        const response = await UserService.destroyUser(userId);
        if (!response) {
            return res.error('User not found', 'Not Found', 404);
        }

        if (req.session && req.session.userId === userId) {
            req.session.destroy((err) => {
                if (err) {
                    if (err instanceof Error) {
                        return res.error(
                            err.message,
                            'Internal Server Error',
                            500
                        );
                    }
                    return res.error(
                        'An unknown error occurred',
                        'Internal Server Error',
                        500
                    );
                }

                res.success(null, 'User deleted successfully');
            });
        } else {
            res.success(null, 'User deleted successfully');
        }
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

export async function updateUser(req: Request, res: Response) {
    if (req.session.userId !== req.params.id) {
        return res.error(
            'You are not authorized to update this user',
            'Unauthorized',
            401
        );
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(errors.array(), 'Validation Error', 400);
    }

    try {
        const userId = req.params.id;
        if (!userId) {
            return res.error('User ID is required', 'Bad Request', 400);
        }
        const { old_password, new_password, ...userDetails } = req.body;

        if (new_password) {
            if (!old_password) {
                return res.error(
                    'Old password is required',
                    'Bad Request',
                    400
                );
            }

            const updatedUser = await UserService.updateUserPassword(
                userId,
                old_password,
                new_password
            );

            if (!updatedUser) {
                return res.error(
                    'Invalid old password or update failed',
                    'Unauthorized',
                    401
                );
            }
        }

        const updatedUser = await UserService.updateUser(userId, {
            ...userDetails,
        });

        if (!updatedUser) {
            return res.error(
                'User not found or update failed',
                'Not Found',
                404
            );
        }

        res.success(updatedUser, 'User details updated successfully');
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
