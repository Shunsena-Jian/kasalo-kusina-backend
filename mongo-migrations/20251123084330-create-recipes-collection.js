const recipes = require("../src/routes/recipes.js");
module.exports = {
  async up(db, client) {
    await db.createCollection('recipes');

    const recipesCollection = db.collection('recipes');
    await recipesCollection.createIndex({ recipe_id: 1 }, { unique: true });
    await recipesCollection.createIndex({ recipe_user_id: 1 });

  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('recipes').drop();
  }
};