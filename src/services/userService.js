import UserRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

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
}

export default new UserService();