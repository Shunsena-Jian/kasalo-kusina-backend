import UserRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import {updateUser} from "../controllers/userController.js";

const saltRounds = 10;

class UserService {
    async findUserById(id) {
        const user = await UserRepository.findUser({
            id: id
        });
        if (user) {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        }

        return null;
    }

    async createUser(user) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser = {
            username: user.username,
            email: user.email,
            password: hashedPassword,
        };

        await UserRepository.createUser(newUser);

        const createdUser = await UserRepository.findUser({
            email: user.email
        })

        if (createdUser) {
            const { password, ...userWithoutPassword } = createdUser;
            return userWithoutPassword;
        }

        return null;
    }

    async verifyUser(email, userPassword) {
        const user = await UserRepository.findUser({
            email: email
        });

        if (! user) {
            return null;
        }

        const isMatch = await bcrypt.compare(userPassword, user.password);

        if (! isMatch) {
            return null;
        }

        const { password, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }

    async destroyUser(id) {
        const response = await UserRepository.findUser({
            id: id
        });

        if (! response) {
            return null;
        }

        await UserRepository.destroyUser({
            id: id
        });

        return response;
    }

    async updateUser(id, updatedUserDetails) {
        const user = await UserRepository.findUser({
            id: id
        });

        if (! user) {
            return null;
        }

        const fieldsToUpdate = {};

        if (updatedUserDetails.username) {
            fieldsToUpdate.username = updatedUserDetails.username;
        }

        if (updatedUserDetails.new_password) {
            fieldsToUpdate.password = await bcrypt.hash(updatedUserDetails.new_password, saltRounds);
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }

        const updateResult = await UserRepository.updateUser({
            id: id
        }, {
            ...fieldsToUpdate,
        });

        if (updateResult) {
            return this.findUserById(id);
        }

        return null;
    }

    async verifyPassword(id, oldPassword) {
        const user = await UserRepository.findUser({
            id: id
        });

        if (! user) {
            return null;
        }

        return await bcrypt.compare(oldPassword, user.password);
    }
}

export default new UserService();