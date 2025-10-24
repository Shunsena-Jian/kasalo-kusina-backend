import UserRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

class UserService {
    async findUserById(id) {
        const user = await UserRepository.findUserById(id);
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

        return UserRepository.createUser(newUser);
    }

    async verifyUser(email, userPassword) {
        const user = await UserRepository.findUserByEmail(email);
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

    async destroyUser(email) {
        const response = await UserRepository.findUserByEmail(email);
        if (! response) {
            return null;
        }

        await UserRepository.destroyUserByEmail(email);

        return response;
    }
}

export default new UserService();