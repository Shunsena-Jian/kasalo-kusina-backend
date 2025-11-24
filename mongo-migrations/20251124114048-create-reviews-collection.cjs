module.exports = {
    async up(db, client) {
        await db.createCollection('reviews');
        const reviewsCollection = db.collection('reviews');

        // 1. Compound Unique Index (Business Logic)
        // Ensures a user can only review a specific recipe once
        await reviewsCollection.createIndex(
            { recipe_id: 1, user_id: 1 },
            { unique: true }
        );

        // 2. Compound Index (Sorting)
        // Efficiently fetch reviews for a recipe, sorted by highest rating
        await reviewsCollection.createIndex({ recipe_id: 1, rating: -1 });
    },

    async down(db, client) {
        // No drop action
    }
};