'use strict';

import db from "db-migrate/lib/interface/seederInterface.js";

export function up(db) {
    return db.runSql('ALTER TABLE users MODIFY COLUMN created_at BIGINT(20) UNSIGNED NOT NULL')
        .then(() => db.runSql('ALTER TABLE users MODIFY COLUMN updated_at BIGINT(20) UNSIGNED NOT NULL'));
}

export function down() {
    return db.runSql('ALTER TABLE users MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP')
        .then(() => db.runSql('ALTER TABLE users MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'));
}

export const _meta = {
    version: 1,
}