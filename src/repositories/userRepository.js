import knex from '../config/knex.js';
import { v4 as uuid } from 'uuid';

const table = 'users';

class UserRepository {
    async createUser(user) {
        const { username, password, email } = user;
        const id = uuid();

        return knex(table).insert({
            id,
            username,
            password,
            email
        });
    }

    async findUser(where) {
        return knex(table)
            .where(where)
            .first();
    }

    async destroyUser(where) {
        return knex(table).where(where).del();
    }
}

export default new UserRepository();