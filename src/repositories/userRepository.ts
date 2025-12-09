import knex from '../config/knex.js';
import { v4 as uuid } from 'uuid';
import {
    type CreateUser,
    type UpdateUser,
    type UserWhere,
} from '../types/user.js';
import { getCurrentUnixTimeStamp } from "../utils/dateUtils.js";

const table = 'users';

class UserRepository {
    async createUser(user: CreateUser) {
        const { username, password, email, user_type, user_status } = user;
        const id = uuid();

        return knex(table).insert({
            id,
            username,
            password,
            email,
            user_type,
            user_status,
            created_at: getCurrentUnixTimeStamp(),
            updated_at: getCurrentUnixTimeStamp()
        });
    }

    async updateUser(where: UserWhere, updatedUser: UpdateUser) {
        return knex(table).where(where).update({
            ...updatedUser,
            updated_at: getCurrentUnixTimeStamp(),
        });
    }

    async findUser(where: UserWhere) {
        return knex(table).where(where).first();
    }

    async destroyUser(where: UserWhere) {
        return knex(table).where(where).del();
    }

    async listUsers(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return knex(table).limit(limit).offset(offset);
    }

    async countUsers(): Promise<number> {
        const result = await knex(table).count({ count: '*' }).first();
        return Number(result?.count) || 0;
    }

    async getUsersByIds(ids: string[]) {
        return knex(table).whereIn('id', ids).select('id', 'first_name', 'last_name');
    }
}

export default new UserRepository();
