import knex from '../config/knex.js';
import { v4 as uuid } from 'uuid';
import {
    type CreateUser,
    type UpdateUser,
    type UserWhere,
} from '../types/user.js';

const table = 'users';

class UserRepository {
    async createUser(user: CreateUser) {
        const { username, password, email } = user;
        const id = uuid();

        return knex(table).insert({
            id,
            username,
            password,
            email,
        });
    }

    async updateUser(where: UserWhere, updatedUser: UpdateUser) {
        return knex(table).where(where).update({
            ...updatedUser,
            updated_at: knex.fn.now(),
        });
    }

    async findUser(where: UserWhere) {
        return knex(table).where(where).first();
    }

    async destroyUser(where: UserWhere) {
        return knex(table).where(where).del();
    }
}

export default new UserRepository();
