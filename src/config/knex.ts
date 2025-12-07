import knex from 'knex';
import 'dotenv/config';

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.MYSQL_DB_NAME ||  process.env.DB_NAME;

if (!dbHost || !dbUser || !dbPassword || !dbName) {
    throw new Error('Database environment variables are not defined');
}

const knexConfig: knex.Knex.Config = {
    client: 'mysql2',
    connection: {
        host: dbHost,
        user: dbUser,
        password: dbPassword,
        database: dbName,
    },
};

export default knex(knexConfig);
