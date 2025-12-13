module.exports = {
    /**
     * @param db {import('mongodb').Db}
     * @param client {import('mongodb').MongoClient}
     * @returns {Promise<void>}
     */
    async up(db, client) {
        await db.createCollection('tags');
        const tagsCollection = db.collection('tags');

        await tagsCollection.createIndex({ name: 1 });
        await tagsCollection.createIndex({ slug: 1 }, { unique: true });
    },

    /**
     * @param db {import('mongodb').Db}
     * @param client {import('mongodb').MongoClient}
     * @returns {Promise<void>}
     */
    async down(db, client) {
    }
};
