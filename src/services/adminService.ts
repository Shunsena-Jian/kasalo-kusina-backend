import UserRepository from "../repositories/userRepository.js";
import { type PublicUser } from "../types/user.js";

class AdminService {
    async listUsers(
        page: number,
        limit: number
    ): Promise<{ users: PublicUser[]; total: number; page:number; limit: number }> {
        const users = await UserRepository.listUsers(page, limit);
        const totalUsers = await UserRepository.countUsers();

        const usersWithoutPassword = users.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        return {
            users: usersWithoutPassword,
            total: totalUsers,
            page,
            limit
        };
    }
}

export default new AdminService();