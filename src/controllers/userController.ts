import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/userService.js';

export async function getUserDetails(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.error('User ID is required', 400);
        }

        const user = await UserService.findUserById(userId);
        if (!user) {
            return res.error('User not found', 404);
        }

        res.success(user);
    } catch (error) {
        res.error(error);
    }
}

export async function createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(errors.array(), 400);
    }

    try {
        const user = await UserService.createUser(req.body);

        if (! user) {
            res.error('Failed to create user', 400);
        }

        if (user && req.session) {
            req.session.userId = user.id;
            req.session.userType = user.user_type;
        }

        res.success(user);
    } catch (error) {
        res.error(error);
    }
}

export async function loginUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(errors.array(), 400);
    }

    try {
        const email = req.body.email;
        const password = req.body.password;

        const response = await UserService.verifyUser(email, password);

        if (response) {
            req.session.userId = response.id;
            req.session.userType = response.user_type;
            return res.success(response);
        }

        res.error('Login failed', 401);
    } catch (error) {
        res.error(error);
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
                            500
                        );
                    }
                    return res.error(
                        'An unknown error occurred',
                        500
                    );
                }

                res.success(true);
            });
        } else {
            res.success(true);
        }
    } catch (error) {
        res.error(error);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.error('User ID is required');
        }

        const response = await UserService.destroyUser(userId);
        if (!response) {
            return res.error('User not found');
        }

        if (req.session && req.session.userId === userId) {
            req.session.destroy((err) => {
                if (err) {
                    if (err instanceof Error) {
                        return res.error(
                            err.message
                        );
                    }
                    return res.error('An unknown error occurred');
                }

                res.success(null);
            });
        } else {
            res.success(null);
        }
    } catch (error) {
        res.error(error);
    }
}

export async function updateUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(errors.array());
    }

    try {
        const userId = req.params.id;
        if (!userId) {
            return res.error('User ID is required');
        }

        const updatedUser = await UserService.updateUser(userId, req.body);

        if (!updatedUser) {
            return res.error('User not found or update failed');
        }

        res.success(updatedUser);
    } catch (error) {
        res.error(error);
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    try {
        const userId = req.session.userId!;

        const user = await UserService.findUserById(userId);
        if (! user) {
            return res.error('User not found', 404);
        }

        return res.success(user);
    } catch (error) {
        res.error(error);
    }
}
