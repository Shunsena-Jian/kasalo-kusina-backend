import Recipe from '../models/Recipe.js';
import {RECIPES_STATUS} from "../constants/recipes.js";

class RecipeRepository {
    async listRecipes(query?: string) {
        const filter: any = { status: RECIPES_STATUS.PUBLISHED };
        if (query) {
            filter.title = { $regex: query, $options: 'i' };
        }
        return Recipe.find(filter).sort({ average_rating: -1 });
    }

    async getFeaturedRecipes() {
        return Recipe.find({ status: RECIPES_STATUS.PUBLISHED, featured: true }).sort({ created_at: -1 });
    }

    async getNewRecipes() {
        return Recipe.find({ status: RECIPES_STATUS.PUBLISHED }).sort({ created_at: -1 });
    }

    async insertRecipe(recipeData: any) {
        const recipe = new Recipe(recipeData);
        return await recipe.save();
    }

    async getRecipeById(id: string) {
        return Recipe.findById(id);
    }
}

export default new RecipeRepository();