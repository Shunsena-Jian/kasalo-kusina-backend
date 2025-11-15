import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import { CreateUser, UpdateUser } from '../types/user.js';

const saltRounds = 10;

class UserService {
    async findUserById(id: string) {
        const user = await UserRepository.findUser({
            id: id,
        });
        if (user) {
            const { ...userWithoutPassword } = user;
            delete userWithoutPassword.password;
            return userWithoutPassword;
        }

        return null;
    }

    async createUser(user: CreateUser) {
        if (!user.password) {
            throw new Error('Password is required');
        }
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser: CreateUser = {
            username: user.username,
            email: user.email,
            password: hashedPassword,
        };

        await UserRepository.createUser(newUser);

        const createdUser = await UserRepository.findUser({
            email: user.email,
        });

        if (createdUser) {
            const { ...userWithoutPassword } = createdUser;
            delete userWithoutPassword.password;
            return userWithoutPassword;
        }

        return null;
    }

    async verifyUser(email: string, userPassword: string) {
        const user = await UserRepository.findUser({
            email: email,
        });

        if (!user || !user.password) {
            return null;
        }

        const isMatch = await bcrypt.compare(userPassword, user.password);

        if (!isMatch) {
            return null;
        }

        const { ...userWithoutPassword } = user;
        delete userWithoutPassword.password;
        return userWithoutPassword;
    }

    async destroyUser(id: string) {
        const response = await UserRepository.findUser({
            id: id,
        });

        if (!response) {
            return null;
        }

        await UserRepository.destroyUser({
            id: id,
        });

        return response;
    }

    async updateUser(id: string, updatedUserDetails: UpdateUser) {
        const user = await UserRepository.findUser({
            id: id,
        });

        if (!user) {
            return null;
        }

        const fieldsToUpdate: UpdateUser = {};

        if (updatedUserDetails.username) {
            fieldsToUpdate.username = updatedUserDetails.username;
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            const { ...userWithoutPassword } = user;
            delete userWithoutPassword.password;
            return userWithoutPassword;
        }

        const updateResult = await UserRepository.updateUser(
            {
                id: id,
            },
            {
                ...fieldsToUpdate,
            }
        );

        if (updateResult) {
            return this.findUserById(id);
        }

        return null;
    }

    async verifyPassword(id: string, oldPassword: string) {
        const user = await UserRepository.findUser({
            id: id,
        });

        if (!user || !user.password) {
            return null;
        }

        return await bcrypt.compare(oldPassword, user.password);
    }

    async updateUserPassword(
        id: string,
        oldPassword: string,
        newPassword: string
    ) {
        const isPasswordVerified = await this.verifyPassword(id, oldPassword);
        if (!isPasswordVerified) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const updateResult = await UserRepository.updateUser(
            {
                id: id,
            },
            {
                password: hashedPassword,
            }
        );

        if (updateResult) {
            return this.findUserById(id);
        }

        return null;
    }
}

export default new UserService();
