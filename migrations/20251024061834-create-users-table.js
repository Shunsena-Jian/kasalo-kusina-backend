'use strict';

import { USER_TYPES } from "../src/constants/users.js";

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
export function setup() {}

export function up(db) {
    return db.createTable(
        'users',
        {
            id: { type: 'string', length: 255, primaryKey: true },
            username: {
                type: 'string',
                length: 255,
                notNull: true,
                unique: true,
            },
            password: { type: 'string', notNull: true },
            email: { type: 'string', notNull: true, unique: true },
            user_type: { type: 'string', notNull: true, defaultValue: USER_TYPES.GUEST },
            created_at: {
                type: 'timestamp',
                notNull: true,
                defaultValue: String('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: 'timestamp',
                notNull: true,
                defaultValue: String('CURRENT_TIMESTAMP'),
            },
        },
        { ifNotExists: true }
    );
}

export function down() {
    return null;
}

export const _meta = {
    version: 1,
};
