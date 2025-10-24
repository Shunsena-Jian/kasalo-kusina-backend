import knex from '../config/knex.js';
import { v4 as uuid } from 'uuid';

const table = 'users';

class UserRepository {
    async createUser(user) {
        const { username, password, email } = user;
        const id = uuid();
        const [userId] = await knex(table).insert({
            id,
            username,
            password,
            email
        });

        if (userId) {
            return this.findUser({
                id: id
            });
        }

        return null;
    }

    async findUser(where) {
        return knex(table)
            .select(
                'id',
                'username',
                'email'
            )
            .where(where)
            .first();
    }

    async destroyUserByEmail(email) {
        return knex(table).where({ email }).del();
    }
}

export default new UserRepository();