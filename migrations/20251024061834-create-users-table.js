'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
export function setup(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
}

export function up(db) {
  return db.createTable('users', {
      id: { type: 'string', length: 255, primaryKey: true },
      username: { type: 'string', length: 255, notNull: true, unique: true },
      password: { type: 'string', notNull: true },
      email: { type: 'string', notNull: true, unique: true },
      created_at: { type: 'timestamp', notNull: true, defaultValue: String('CURRENT_TIMESTAMP') },
      updated_at: { type: 'timestamp', notNull: true, defaultValue: String('CURRENT_TIMESTAMP') }
  }, { ifNotExists: true });
}

export function down(db) {
  return null;
}

export const _meta = {
  "version": 1
};
