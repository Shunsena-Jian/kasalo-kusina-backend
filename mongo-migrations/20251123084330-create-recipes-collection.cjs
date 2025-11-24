module.exports = {
    async up(db, client) {
        // Create the collection
        await db.createCollection('recipes');
        const recipesCollection = db.collection('recipes');

        // 1. Text Search Index (for search functionality)
        await recipesCollection.createIndex(
            {
                title: "text",
                description: "text",
                "ingredients.name": "text"
            },
            {
                name: "RecipeTextIndex",
                weights: {
                    title: 10,
                    description: 5,
                    "ingredients.name": 3
                }
            }
        );

        // 2. Multikey Indexes (for efficient filtering)
        await recipesCollection.createIndex({ tags: 1 });
        await recipesCollection.createIndex({ categories: 1 });

        // 3. Compound Indexes (for optimized sorting and specific queries)
        // "Top Rated in Category"
        await recipesCollection.createIndex({ categories: 1, average_rating: -1 });
        // "Newest in Tag"
        await recipesCollection.createIndex({ tags: 1, created_at: -1 });
        // "User's Published Recipes"
        await recipesCollection.createIndex({ user_id: 1, status: 1 });
    },

    async down(db, client) {
        // No drop action
    }
};