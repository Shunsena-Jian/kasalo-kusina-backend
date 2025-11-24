module.exports = {
    /**
     * @param db {import('mongodb').Db}
     * @param client {import('mongodb').MongoClient}
     * @returns {Promise<void>}
     */
    async up(db, client) {
        await db.createCollection('categories');
        const categoriesCollection = db.collection('categories');

        await categoriesCollection.createIndex({ name: 1 });
        await categoriesCollection.createIndex({ slug: 1 });
    },

    /**
     * @param db {import('mongodb').Db}
     * @param client {import('mongodb').MongoClient}
     * @returns {Promise<void>}
     */
    async down(db, client) {
    }
};
