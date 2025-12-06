import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import { type CreateUser, type PublicUser, type UpdateUser } from '../types/user.js';
import {USER_STATUSES, USER_TYPES} from "../constants/users.js";

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
        if (! user.password) {
            throw new Error('Password is required');
        }

        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser: CreateUser = {
            username: user.username,
            email: user.email,
            user_type: USER_TYPES.KASALO,
            user_status: USER_STATUSES.ACTIVE,
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

        if (! user || ! user.password) {
            return null;
        }

        const isMatch = await bcrypt.compare(userPassword, user.password);

        if (!isMatch) {
            return null;
        }

        const isActive = user.user_status === USER_STATUSES.ACTIVE;
        if (! isActive) {
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
        updatedUserDetails: UpdateUser & {
            old_password?: string;
            new_password?: string;
        }
    ): Promise<PublicUser | null> {
        const user = await UserRepository.findUser({
            id: id,
        });

        if (! user) {
            return null;
        }

        const fieldsToUpdate: UpdateUser = {};

        if (updatedUserDetails.username) {
            fieldsToUpdate.username = updatedUserDetails.username;
        }

        if (updatedUserDetails.user_status) {
            fieldsToUpdate.user_status = updatedUserDetails.user_status;
        }

        if (updatedUserDetails.user_type) {
            fieldsToUpdate.user_type = updatedUserDetails.user_type;
        }

        if (updatedUserDetails.new_password) {
            if (!updatedUserDetails.old_password) {
                throw new Error(
                    'Old password is required to update the password'
                );
            }
            const isPasswordVerified = await this.verifyPassword(
                id,
                updatedUserDetails.old_password
            );
            if (!isPasswordVerified) {
                return null;
            }

            fieldsToUpdate.password = await bcrypt.hash(
                updatedUserDetails.new_password,
                saltRounds
            );
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
}

export default new UserService();
