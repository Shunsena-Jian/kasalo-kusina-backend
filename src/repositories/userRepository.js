import mysqlPool from '../config/mysql.js';
import { v4 as uuid } from 'uuid';

class UserRepository {
    async createUser(user) {
        const { username, password, email } = user;
        const id = uuid();
        const [result] = await mysqlPool.query(
            'INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)',
            [id, username, password, email]
        );

        if (result.affectedRows === 1) {
            return this.findUserById(id);
        }

        return null;
    }

    async findUserById(id) {
        const [rows] = await mysqlPool.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        return rows[0];
    }

    async findUserByEmail(email) {
        const [rows] = await mysqlPool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        return rows[0];
    }

    async destroyUserByEmail(email) {
        const [result] = await mysqlPool.query(
            'DELETE FROM users WHERE email = ?',
            [email]
        );

        return result[0];
    }
}

export default new UserRepository();