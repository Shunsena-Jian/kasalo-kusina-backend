import knex from '../config/knex.js';
import Recipe from '../models/Recipe.js';

class RecipeRepository {
    async insertRecipe(recipeData: any) {
        const recipe = new Recipe(recipeData);
        return await recipe.save();
    }
}

export default new RecipeRepository();