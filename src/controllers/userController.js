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
        console.log(req.session);

        res.success(user, 'User created successfully', 201);
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
            });
        }

        res.success(null, 'User deleted and session destroyed successfully');
    } catch (error) {
        res.error(error.message, 'Internal Server Error', 500);
    }
}