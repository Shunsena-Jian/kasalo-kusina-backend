import { validationResult } from "express-validator";
import UserService from "../services/userService.js";

export async function getUserDetails(req, res) {
    try {
        const userId = req.params.id;
        if (! userId) {
            res.error('User ID is required', 400);
        }

        const user = await UserService.findUserById(userId);
        if (! user) {
            return res.error('User not found', 404);
        }

        res.success(user, 'User details retrieved successfully');
    } catch (error) {
        res.error(error.message, 'Internal Server Error', 500);
    }
}

export async function createUser(req, res) {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.error(errors.array(), 'Validation Error', 400);
    }

    try {
        const user = await UserService.createUser(req.body);

        req.session.userId = user.id;

        res.success(user, 'User created successfully', 201);
    } catch (error) {
        res.error(error.message, 'Internal Server Error', 500);
    }
}

export async function loginUser(req, res) {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
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

        res.error('Invalid email or password', 401);
    } catch (error) {
        res.error(error.message, 'Internal Server Error', 500);
    }
}

export async function logoutUser(req, res) {
    try {
        if (req.session && req.session.userId) {
            req.session.destroy(err => {
                if (err) {
                    return res.error(err.message, 'Internal Server Error', 500);
                }

                res.success(null, 'User logged out successfully');
            });
        } else {
            res.success(null, 'User already logged out');
        }
    } catch (error) {
        res.error(error.message, 'Internal Server Error', 500);
    }
}

export async function deleteUser(req, res) {
    try {
        const userId = req.params.id;

        if (! userId) {
            return res.error('User ID is required', 400);
        }

        const response = await UserService.destroyUser(userId);
        if (! response) {
            res.error('User not found', 404);
        }

        if (req.session && req.session.userId === userId) {
            req.session.destroy(err => {
                if (err) {
                    return res.error(err.message, 'Internal Server Error', 500);
                }

                res.success(null, 'User deleted and session destroyed successfully');
            });
        } else {
            res.success(null, 'User deleted successfully');
        }
    } catch (error) {
        res.error(error.message, 'Internal Server Error', 500);
    }
}

export async function updateUser(req, res){
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.error(errors.array(), 'Validation Error', 400);
    }

    try {
        const userId = req.params.id;
        const { old_password, new_password, ...userDetails } = req.body;

        if (new_password) {
            if (! old_password) {
                return res.error('Old password is required', 400);
            }

            const isPasswordVerified = await UserService.verifyPassword(userId, old_password);
            if (! isPasswordVerified) {
                return res.error('Invalid old password', 401);
            }
        }

        const updatedUser = await UserService.updateUser(userId, {...userDetails, new_password});

        if (! updatedUser) {
            return res.error('User not found or update failed', 404);
        }

        res.success(updatedUser, 'User details updated successfully');
    } catch (error) {
        res.error(error.message, 'Internal Server Error', 500);
    }
}