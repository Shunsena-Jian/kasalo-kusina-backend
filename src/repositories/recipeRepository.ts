import knex from '../config/knex.js';
import Recipe from '../models/Recipe.js';
import {RECIPES_STATUS} from "../constants/recipes.js";

class RecipeRepository {
    async listRecipes() {
        return Recipe.find().where({ status: RECIPES_STATUS.PUBLISHED }).sort({ average_rating: -1 });
    }

    async insertRecipe(recipeData: any) {
        const recipe = new Recipe(recipeData);
        return await recipe.save();
    }
}

export default new RecipeRepository();