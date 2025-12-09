'use strict';

export function setup() {}

export function up(db) {
    return db.addColumn('users', 'first_name', {
        type: 'string',
        length: 255,
        notNull: false,
        after: 'username'
    }).then(() => {
        return db.addColumn('users', 'last_name', {
            type: 'string',
            length: 255,
            notNull: false,
            after: 'first_name'
        });
    });
}

export function down(db) {
    return db.removeColumn('users', 'first_name')
        .then(() => db.removeColumn('users', 'last_name'));
}

export const _meta = {
    version: 1,
};
