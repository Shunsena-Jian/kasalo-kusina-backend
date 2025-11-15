import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import { type CreateUser, type PublicUser, type UpdateUser } from '../types/user.js';

const saltRounds = 10;

class UserService {
    async findUserById(id: string): Promise<PublicUser | null> {
        const user = await UserRepository.findUser({
            id: id,
        });
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }

        return null;
    }

    async createUser(user: CreateUser): Promise<PublicUser | null> {
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
            const { password, ...userWithoutPassword } = createdUser;
            return userWithoutPassword;
        }

        return null;
    }

    async verifyUser(
        email: string,
        userPassword: string
    ): Promise<PublicUser | null> {
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

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async destroyUser(id: string): Promise<PublicUser | null> {
        const response = await UserRepository.findUser({
            id: id,
        });

        if (!response) {
            return null;
        }

        await UserRepository.destroyUser({
            id: id,
        });

        const { password, ...userWithoutPassword } = response;
        return userWithoutPassword;
    }

    async updateUser(
        id: string,
        updatedUserDetails: UpdateUser
    ): Promise<PublicUser | null> {
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
            const { password, ...userWithoutPassword } = user;
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
    ): Promise<PublicUser | null> {
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
